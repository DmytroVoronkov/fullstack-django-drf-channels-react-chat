from channels.generic.websocket import WebsocketConsumer

class MyConsumer(WebsocketConsumer):
    # groups = ["broadcast"]

    def connect(self):
        self.accept()

    def receive(self, text_data=None, bytes_data=None):
        # Called with either text_data or bytes_data for each frame
        # You can call:
        self.send(text_data="Hello world!")
        # Want to force-close the connection? Call:
        # self.close()

    def disconnect(self, close_code):
        # Called when the socket closes
        pass