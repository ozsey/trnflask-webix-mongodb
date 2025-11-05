import csv

# SOAL 1 - Function ##
def decode(string):
    vowels = {'a': '1', 'i': '2', 'u': '3', 'e': '4', 'o': '5'}
    decoded = []
    for idx, char in enumerate(string):
        if idx == 0 and (char == '-' or char == '+'):
            raise ValueError("Invalid input: '-' or '+' is not allowed at the beginning")
        elif char == '-':
            decoded.pop()
        elif char == '+':
            decoded.append(decoded[-1])
        elif char in vowels:
            decoded.append(vowels[char])
        elif char.isdigit() and int(char) in range(1, 6):
            decoded.append(['a', 'i', 'u', 'e', 'o'][int(char)-1])
        else:
            decoded.append(char)
    return ''.join(decoded)

# SOAL 2 - Class ##
class Product:
    def __init__(self, brand, supplier, harga):
        self.brand, self.supplier, self.harga = brand, supplier, harga

    def info(self):
        print(f"Brand: {self.brand}, Supplier: {self.supplier}, Harga: {self.harga}")

class FNB(Product):
    def __init__(self, brand, supplier, harga, expired_date):
        super().__init__(brand, supplier, harga)
        self.expired_date = expired_date

    def info(self):
        super().info()
        print(f"Expired Date: {self.expired_date}")

class HomeCare(Product):
    def __init__(self, brand, supplier, harga, type):
        super().__init__(brand, supplier, harga)
        self.type = type

    def info(self):
        super().info()
        print(f"Type: {self.type}")

class Electronics(Product):
    def __init__(self, brand, supplier, harga, power_usage):
        super().__init__(brand, supplier, harga)
        self.power_usage = power_usage

    def info(self):
        super().info()
        print(f"Power Usage: {self.power_usage}")

# Fungsi untuk menyimpan data ke file CSV 
def saveData(product, filepath):
    with open(filepath, 'a', newline='') as file:
        writer = csv.writer(file)
        if isinstance(product, FNB):
            writer.writerow([product.brand, product.supplier, product.harga, product.expired_date])
        elif isinstance(product, HomeCare):
            writer.writerow([product.brand, product.supplier, product.harga, product.type])
        else:
            writer.writerow([product.brand, product.supplier, product.harga])

# Fungsi untuk mengambil data dari file CSV
def loadData(filepath):
    with open(filepath, 'r') as file:
        reader = csv.reader(file)
        return [Product(*row) if len(row) == 3 else FNB(*row) if len(row) == 4 else HomeCare(*row) for row in reader]

# Pengujian
def main():
    try:
    # Pengujian untuk SOAL 1 - Function
        decoded_string = decode("alfa+mart-123")
        print("Hasil decode:", decoded_string)
    except ValueError as e:
        print("Error:", e)

    # Pengujian untuk SOAL 2 - Class
    fanta = FNB('Fanta', 'Coca-cola company', 10000, '2024-01-01')
    fanta.info()

    # Simpan data ke file
    saveData(fanta, "products.csv")

    # Load data dari file
    loaded_products = loadData("products.csv")
    print("Data yang telah dimuat dari file:")
    for product in loaded_products:
        product.info()

if __name__ == "__main__":
    main()