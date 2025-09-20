 

import multiprocessing
import subprocess
import os

# To run Jarvis
def startJarvis():
        # Code for process 1
        print("Process 1 is running.")
        from main import start
        start()

# To run hotword
def listenHotword():
        # Code for process 2
        print("Process 2 is running.")
        from engine.features import hotword
        hotword()


    # Start both processes
if __name__ == '__main__':
        # Configure external screen overlay path (adjust if your location differs)
        os.environ['SCREEN_OVERLAY_PATH'] = r'C:\gya\jarvis\Screen-Analysis-Overlay-main\main.py'
        p1 = multiprocessing.Process(target=startJarvis)
        p2 = multiprocessing.Process(target=listenHotword)
        p1.start()
        subprocess.call([r'device.bat'])
        p2.start()
        p1.join()

        if p2.is_alive():
            p2.terminate()
            p2.join()

        print("system stop")