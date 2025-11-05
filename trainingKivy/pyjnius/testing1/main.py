from pyjnius import autoclass, java_method

A = autoclass('A')

class B(A):
    @java_method('()V')
    def test_method(self):
        print('Hello World!')
        
if __name__ == '__main__':
    b_instance = B()
    A().run(b_instance)