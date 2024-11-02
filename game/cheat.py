# not finished, this file doesn't currently work. But, I am making a cheat for the game.

import cv2
import numpy as np
import pyautogui
import time

game_top_left_x = 400
game_top_left_y = 100
game_width = 400
game_height = 600

fireball_color = (255, 69, 0)
bucket_color = (0, 191, 255)


def find_object_position(screenshot, color_rgb, tolerance=40):
     screenshot_rgb = cv2.cvtColor(screenshot, cv2.COLOR_BGR2RGB)

    lower_bound = np.array([c - tolerance for c in color_rgb])
    upper_bound = np.array([c + tolerance for c in color_rgb])
    mask = cv2.inRange(screenshot_rgb, lower_bound, upper_bound)
    positions = np.where(mask > 0)

    if len(positions[0]) == 0:
        return None

    average_x = np.mean(positions[1])
    return average_x


while True:
    screenshot = pyautogui.screenshot(region=(game_top_left_x, game_top_left_y, game_width, game_height))
    screenshot_np = np.array(screenshot)

    fireball_x = find_object_position(screenshot_np, fireball_color)
    bucket_x = find_object_position(screenshot_np, bucket_color)

    if fireball_x is not None and bucket_x is not None:
        if fireball_x < bucket_x:
            pyautogui.keyDown('left')
            time.sleep(0.05)
            pyautogui.keyUp('left')
        elif fireball_x > bucket_x:
            pyautogui.keyDown('right')
            time.sleep(0.05)
            pyautogui.keyUp('right')

    time.sleep(0.01)
