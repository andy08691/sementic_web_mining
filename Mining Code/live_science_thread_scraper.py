import json

from selenium import webdriver
from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import time
profile = webdriver.FirefoxProfile(
        '/Users/jason/Library/Application Support/Firefox/Profiles/d80pd38m.default-release')
profile.update_preferences()
desired = DesiredCapabilities.FIREFOX
asu_driver_options = Options()
asu_driver_options.headless = False

url = 'https://forums.livescience.com/forums/coronavirus-epidemiology.42/'

driver = webdriver.Firefox(firefox_profile=profile,
                        desired_capabilities=desired,
                        executable_path="/Users/jason/Downloads/geckodriver",
                        options=asu_driver_options)

driver.get(url)
json_list = []
for i in range(2, 9):
    time.sleep(5)
    page_thread_element_list = driver.find_elements(By.CLASS_NAME, "structItem")
    for element in page_thread_element_list:
        try:
            data = {}
            title_element = element.find_element(By.CSS_SELECTOR, ".structItem-title [href]")
            url = title_element.get_attribute('href')
            title = title_element.text
            post_time = element.find_element(By.CLASS_NAME, "structItem-latestDate").get_attribute("data-time")
            responseCount_element = element.find_elements(By.TAG_NAME, 'dd')
            responseCount = responseCount_element[1].text
            print(responseCount)
            data['source'] = url
            data['question'] = title
            data['responseCount'] = responseCount
            data['postDate'] = post_time
            json_list.append(data)
        except Exception as e:
            print(e)
    next_element = driver.find_elements(By.CLASS_NAME, 'pageNav-jump')
    for next_button in next_element:
        if next_button.text == 'Next':
            next_button.click()
            break
driver.quit()
with open('live_science_data.json', 'w') as f:
    json.dump(json_list, f)
