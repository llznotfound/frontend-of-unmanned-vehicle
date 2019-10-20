import csv
from shutil import copyfile

def reverse(array):
    n = len(array)
    for i in range(n//2):
        array[i],array[n-1-i] = array[n-1-i],array[i]
    return array

copyfile('C:\\Users\\86186\\Downloads\\car-frontend-backend\\ocean-demo-frontend-feature-ocean-demo\\test.csv','C:\\Users\\86186\\Downloads\\car-frontend-backend\\test.csv')
 
    #with open("test.csv", "r", encoding = "utf-8") as f:
    #reader = csv.reader(f)
    #column = [row for row in reader]
    #reverse(column)
    #print(column)
   
