import json

from selenium import webdriver
from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time

f = open('live_science_data.json')
data = json.load(f)

profile = webdriver.FirefoxProfile(
        '/Users/jason/Library/Application Support/Firefox/Profiles/d80pd38m.default-release')
profile.update_preferences()
desired = DesiredCapabilities.FIREFOX
asu_driver_options = Options()
asu_driver_options.headless = False

driver = webdriver.Firefox(firefox_profile=profile,
                        desired_capabilities=desired,
                        executable_path="/Users/jason/Downloads/geckodriver",
                        options=asu_driver_options)
updated_list = []
for comment in data:
    try:
        new_data = {}
        url = comment['source']
        driver.get(url)
        time.sleep(3)
        reply_list = driver.find_elements(By.CLASS_NAME, "message")
        new_data['source'] = comment['source']
        new_data['question_title'] = comment['question']
        inner_text = reply_list[0].find_element(By.CLASS_NAME, "message-body").get_attribute('innerText').replace('\n', ' ').replace('\r', '')
        new_data['question_text'] = inner_text
        new_data['responseCount'] = comment['responseCount']
        new_data['postDate'] = comment['postDate']
        updated_list.append(new_data)
    except Exception as e:
        print(e)
with open('live_science_data_updated.json', 'w') as f:
    json.dump(updated_list, f)

