import json

from selenium import webdriver
from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time

f = open('mayo_data.json')
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
        url = comment['source']
        driver.get(url)
        time.sleep(1)
        post_element = driver.find_element(By.CLASS_NAME, "discussion-content").find_element(By.TAG_NAME, 'p')
        inner_text = post_element.get_attribute('innerText').replace('\n', ' ').replace('\r', '')
        comment['question_text'] = inner_text
    except Exception as e:
        print(e)
with open('mayo_data_updated.json', 'w') as f:
    json.dump(data, f)

