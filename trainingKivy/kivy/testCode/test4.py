from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.core.window import Window

class MainApp(App):
    def build(self):
        # Set background color of the app window
        Window.clearcolor = (70, 70, 70, 1)  # Dark gray background
        
        self.operators = ["/", "*", "+", "-"]
        self.last_was_operator = None
        self.last_button = None
        
        main_layout = BoxLayout(orientation="vertical")
        
        # Text input field
        self.solution = TextInput(
            multiline=False, readonly=True, halign="right", font_size=55,
            background_color=(0, 0, 0, 1),
            foreground_color=(1, 1, 1, 1)
        )
        main_layout.add_widget(self.solution)

        # Button layout
        buttons = [
            ["7", "8", "9", "/"],
            ["4", "5", "6", "*"],
            ["1", "2", "3", "-"],
            [".", "0", "C", "+"],
        ]
        
        for row in buttons:
            h_layout = BoxLayout()
            for label in row:
                button = Button(
                    text=label,
                    pos_hint={"center_x": 0.5, "center_y": 0.5},
                    font_size=32,
                    background_color=self.get_button_color(label),  # Set button color based on label
                    color=(1, 1, 1, 1)  # White text color for all buttons
                )
                button.bind(on_press=self.on_button_press)
                h_layout.add_widget(button)
            main_layout.add_widget(h_layout)

        # Equals button
        equals_button = Button(
            text="=", pos_hint={"center_x": 0.5, "center_y": 0.5},
            font_size=32,
            background_color=(0, 0, 0, 0.65),  # Teal color for equals button
            color=(0, 0, 0, 1)  # White text
        )
        equals_button.bind(on_press=self.on_solution)
        main_layout.add_widget(equals_button)

        return main_layout

    def get_button_color(self, label):
        # Define different colors for operator buttons, C button, and numeric buttons
        if label in self.operators:
            return (0, 0, 0, 0.85)  # Dark gray for operator buttons
        elif label == "C":
            return (0, 0, 0, 0.85)  # Teal for C button
        else:
            return (0, 0, 0, 0.9)  # Dark gray for numeric buttons

    def on_button_press(self, instance):
        current = self.solution.text
        button_text = instance.text

        if button_text == "C":
            self.solution.text = ""
            self.last_was_operator = False
        elif button_text in self.operators:
            if self.last_was_operator:
                return
            if current != "" and current[-1] in self.operators:
                current = current[:-1]
            self.solution.text = current + button_text
            self.last_was_operator = True
        else:
            self.solution.text = current + button_text
            self.last_was_operator = False

    def on_solution(self, instance):
        text = self.solution.text
        try:
            self.solution.text = str(eval(text))
        except Exception as e:
            self.solution.text = "Error"

if __name__ == "__main__":
    MainApp().run()
