import os
import sys
import subprocess
from engine.command import speak


class ExternalAppLauncher:
    def __init__(self):
        self.screen_overlay_process = None
        self.is_overlay_running = False

    def launch_screen_overlay(self):
        try:
            # Allow override via environment variable
            env_path = os.environ.get('SCREEN_OVERLAY_PATH')
            candidates = []
            if env_path:
                candidates.append(env_path)

            cwd = os.getcwd()
            repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir))
            for base in [cwd, repo_root]:
                candidates.append(os.path.join(base, 'screen-analysis-overlay', 'main.py'))
                candidates.append(os.path.join(base, 'screen_analysis_overlay', 'main.py'))

            overlay_path = None
            for candidate in candidates:
                if candidate and os.path.exists(candidate):
                    overlay_path = candidate
                    break

            if not overlay_path:
                speak("Screen analysis overlay not found. Please place main.py under 'screen-analysis-overlay' or set SCREEN_OVERLAY_PATH.")
                return False

            creationflags = subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0
            self.screen_overlay_process = subprocess.Popen([sys.executable, overlay_path], creationflags=creationflags)
            self.is_overlay_running = True
            speak("Screen analysis overlay launched successfully")
            return True
        except Exception as e:
            speak(f"Failed to launch overlay: {e}")
            return False

    def stop_screen_overlay(self):
        try:
            if self.screen_overlay_process and self.is_overlay_running:
                self.screen_overlay_process.terminate()
                self.screen_overlay_process = None
                self.is_overlay_running = False
                speak("Screen overlay closed")
                return True
        except Exception as e:
            speak(f"Error stopping overlay: {e}")
        return False

    def launch_external_app(self, app_path, app_name="application"):
        try:
            if os.path.exists(app_path):
                creationflags = subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0
                subprocess.Popen([sys.executable, app_path], creationflags=creationflags)
                speak(f"{app_name} launched successfully")
                return True
            else:
                speak(f"{app_name} not found at {app_path}")
                return False
        except Exception as e:
            speak(f"Failed to launch {app_name}: {e}")
            return False


external_launcher = ExternalAppLauncher()


