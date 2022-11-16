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

url = 'https://connect.mayoclinic.org/group/post-covid-recovery-covid-19/?pg=1#discussion-listview'

driver = webdriver.Firefox(firefox_profile=profile,
                        desired_capabilities=desired,
                        executable_path="/Users/jason/Downloads/geckodriver",
                        options=asu_driver_options)

driver.get(url)
json_list = []
for i in range(1, 24):
    time.sleep(2)
    page_thread_element_list = WebDriverWait(driver, 20).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "ch-activity-simple-row")))
    for element in page_thread_element_list:
        try:
            data = {}
            title_element = element.find_element(By.CLASS_NAME, "discussion-title")
            url = title_element.get_attribute('href')
            title = title_element.text
            post_time = element.find_element(By.CLASS_NAME, "last-activity").text
            responseCount = element.find_element(By.CLASS_NAME, "replies").text
            if re.match('[0-9]{1,2}h', post_time):
                post_time = int(datetime.today().timestamp())
            elif re.match('[0-9]d', post_time):
                post_time = int((datetime.today() - timedelta(days=int(post_time.replace('d', '')))).timestamp())
            elif re.match("[A-Za-z]{3} [0-9]{1,2}", post_time):
                post_time = int(datetime.strptime(post_time + ' 2022', '%b %d %Y').timestamp())
            else:
                post_time = post_time.replace("\'", "")
                post_time = int(datetime.strptime(post_time, '%b %y').timestamp())

            print(responseCount)
            data['source'] = url
            data['question_title'] = title
            data['responseCount'] = responseCount
            data['postDate'] = post_time
            json_list.append(data)
        except Exception as e:
            print(e)
    next_element = driver.find_element(By.CLASS_NAME, 'next').find_element(By.TAG_NAME, 'a')
    driver.execute_script("arguments[0].click();", next_element)
driver.quit()
with open('mayo_data.json', 'w') as f:
    json.dump(json_list, f)
