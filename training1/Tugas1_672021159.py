priceTuple = [13000, 9000, 8000, 9000, 16000]
fruitTuple = ['mango', 'apple', 'orange', 'watermelon', 'grape']
fruitDict = {}

## SOAL 1 ##
for i in range(len(fruitTuple)):
    fruitDict[fruitTuple[i]] = priceTuple[i]
# alternative code
# fruitDict = dict(zip(fruitTuple, priceTuple))
print(fruitDict)

## SOAL 2 ##
# Dari dictionary yang sudah terbuat, hitunglah rata-rata harga buah
total_harga = sum(fruitDict.values())
jumlah_buah = len(fruitDict)
rata_rata_harga = total_harga / jumlah_buah

print("Rata-rata harga buah:", rata_rata_harga)

## SOAL 3 ##
# test_list = [4, 1, {'tiga': 3, 'tujuh': 7}, (9, 8, [2, 5]), 6]
# Dari test_list di atas, buatlah sebuah string dengan isi : '1 2 3 4 5 6 7 8 9'
test_list = [4, 1, {'tiga': 3, 'tujuh': 7}, (9, 8, [2, 5]), 6]

def extract_values(data):
    result = []
    for item in data:
        if isinstance(item, int):  # Jika item adalah integer
            result.append(item)
        elif isinstance(item, dict):  # Jika item adalah dictionary
            result.extend(extract_values(item.values()))
        elif isinstance(item, tuple):  # Jika item adalah tuple
            result.extend(extract_values(item))
        elif isinstance(item, list):  # Jika item adalah list
            result.extend(extract_values(item))
    return result

# Mengambil nilai unik yang sudah diurutkan
result_list = sorted(set(extract_values(test_list)))

# Mengonversi nilai-nilai menjadi string dan menggabungkannya
result_string = ' '.join(map(str, result_list))

print("Hasil string: '" +result_string+ "'")

## SOAL 4 ##
# fti = "teknik informatika fakultas teknologi informasi universitas kristen satya wacana "
# listMahasiswa = ['DEVA', 'ABI', 'IVAN']**
# dictKelas = {'IF001': 'Kapita Selekta', 'IF002': 'Matematika Diskrit', 'IF003': 'Pemrograman Web'}
# Dari 3 variabel di atas, bualah string sebagai berikut
#     - 'Hari ini Deva tidak mengikuti mata kuliah Kapita Selekta'
#     - 'Matematika Diskrit IF003 adalah salah satu mata kuliah di progdi Teknik Informatika Universitas Kristen Satya Wacana'
fti = "teknik informatika fakultas teknologi informasi universitas kristen satya wacana "
listMahasiswa = ['DEVA', 'ABI', 'IVAN']
dictKelas = {'IF001': 'Kapita Selekta', 'IF002': 'Matematika Diskrit', 'IF003': 'Pemrograman Web'}

string1 = f'Hari ini {listMahasiswa[0]} tidak mengikuti mata kuliah {dictKelas["IF001"]}'

progdi = fti.title().split()[0:2]
univ = fti.title().split()[-4:]
string2 = f'{dictKelas["IF002"]} {list(dictKelas.keys())[2]} adalah salah satu mata kuliah di progdi {" ".join(progdi)} {" ".join(univ)}'

print(string1)
print(string2)

## SOAL 5 ##
# listNum = [3, 11, 7, 9, 1, 13, 5, 2, 8, 14, 10, 12, 4, 6, 15]
# Urutkan list di atas tanpa menggunakan fungsi sort
listNum = [3, 11, 7, 9, 1, 13, 5, 2, 8, 14, 10, 12, 4, 6, 15]

def swap(lst, i, j):
    lst[i], lst[j] = lst[j], lst[i]

def bubble_sort(lst):
    n = len(lst)
    for i in range(n):
        for j in range(0, n-i-1):
            if lst[j] > lst[j+1]:
                swap(lst, j, j+1)

bubble_sort(listNum)

print("List setelah diurutkan:", listNum)