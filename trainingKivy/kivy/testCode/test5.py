from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button

class MyApp(App):
    def build(self):
        layout = BoxLayout(orientation='vertical', padding=10, spacing=10)

        button1 = Button(text="Button 1", size_hint=(1, 0.2))
        button2 = Button(text="Button 2", size_hint=(1, 0.2))
        button3 = Button(text="Button 3", size_hint=(1, 0.2))

        layout.add_widget(button1)
        layout.add_widget(button2)
        layout.add_widget(button3)

        return layout

if __name__ == '__main__':
    MyApp().run()
