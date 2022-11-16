import json

from selenium import webdriver
from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from datetime import datetime
import time
profile = webdriver.FirefoxProfile(
        '/Users/jason/Library/Application Support/Firefox/Profiles/d80pd38m.default-release')
profile.update_preferences()
desired = DesiredCapabilities.FIREFOX
asu_driver_options = Options()
asu_driver_options.headless = False

url = 'https://covid19.camhx.ca/mod/forum/view.php?id=1'

driver = webdriver.Firefox(firefox_profile=profile,
                        desired_capabilities=desired,
                        executable_path="/Users/jason/Downloads/geckodriver",
                        options=asu_driver_options)

driver.get(url)
json_list = []
time.sleep(5)
page_thread_element_list = driver.find_elements(By.CLASS_NAME, "discussion")
for element in page_thread_element_list:
    try:
        data = {}
        title_element = element.find_element(By.CLASS_NAME, "d-block")
        url = title_element.get_attribute('href')
        title = title_element.text

        post_time = element.find_element(By.CLASS_NAME, "author").text
        post_time = post_time.split('\n')[1]
        post_time = int(datetime.strptime(post_time, '%d %b %Y').timestamp())
        responseCount = element.find_element(By.CLASS_NAME, 'px-2').text
        data['source'] = url
        data['question_title'] = title
        data['responseCount'] = responseCount
        data['postDate'] = post_time
        json_list.append(data)
    except Exception as e:
        print(e)
driver.quit()
with open('camh_data.json', 'w') as f:
    json.dump(json_list, f)
