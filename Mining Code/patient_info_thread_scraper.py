import json
import re

from selenium import webdriver
from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
from datetime import datetime, timedelta

profile = webdriver.FirefoxProfile(
        '/Users/jason/Library/Application Support/Firefox/Profiles/d80pd38m.default-release')
profile.update_preferences()
desired = DesiredCapabilities.FIREFOX
asu_driver_options = Options()
asu_driver_options.headless = False

url = 'https://patient.info/forums/discuss/browse/coronavirus-covid-19--4541?#group-discussions'

driver = webdriver.Firefox(firefox_profile=profile,
                        desired_capabilities=desired,
                        executable_path="/Users/jason/Downloads/geckodriver",
                        options=asu_driver_options)

driver.get(url)
json_list = []
for i in range(1, 16):
    time.sleep(2)
    page_thread_element_list = WebDriverWait(driver, 20).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "disc-smr")))
    for element in page_thread_element_list:
        try:
            data = {}
            title_element = element.find_element(By.CLASS_NAME, "post__title").find_element(By.TAG_NAME, 'a')
            url = title_element.get_attribute('href')
            title = title_element.text
            post_time = element.find_element(By.CLASS_NAME, "last-reply-on").find_element(By.TAG_NAME, 'time').get_attribute("datetime")
            responseCount = element.find_element(By.CLASS_NAME, "likes_replies").find_elements(By.CLASS_NAME, 'actions')[1].text
            post_time = post_time.split("T")[0]
            post_time = int(datetime.strptime(post_time, '%Y-%m-%d').timestamp())
            data['source'] = url
            data['question_title'] = title
            data['responseCount'] = responseCount
            data['postDate'] = post_time
            json_list.append(data)
        except Exception as e:
            print(e)
    driver.find_element(By.CLASS_NAME, 'reply-ctrl-last').click()
driver.quit()
with open('patient_info_data.json', 'w') as f:
    json.dump(json_list, f)
