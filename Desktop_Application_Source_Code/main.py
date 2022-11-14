from distutils.command.config import config
from tkinter import *
import subprocess
from mylib import config
import ipaddress 
from tkinter import messagebox
from tkinter import NW, Tk, Canvas, PhotoImage, ttk



# def photo_image(img):
#     h, w = img.shape[:2]
#     data = f'P6 {w} {h} 255 '.encode() + img[..., ::-1].tobytes()
#     return PhotoImage(width=w, height=h, data=data, format='PPM')

# def update():
#     ret, img = cap.read()
#     if ret:
#         photo = photo_image(img)
#         canvas.create_image(0, 0, image=photo, anchor=NW)
#         canvas.image = photo
#     app.after(15, update)


def validate_ip(ip_str):  
   try:  
       ip_obj = ipaddress.ip_address(ip_str)  
       return True 
   except ValueError:  
         return False 


def run_program():
    # global entry
    # string= entry.get()
    # label.configure(text=string)
    # config.url = 'http://'+ entry.get() +':8040/video' 
    # config.url = 'http://192.168.1.104:8080/video'
    config.url = entry2.get()
    restaurantId = entry1.get()
    # print(config.url)
    # update()

    # if validate_ip(entry.get()):
        
        
    #subprocess.call(" python Run.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt --model mobilenet_ssd/MobileNetSSD_deploy.caffemodel --input videos/example_01.mp4 --restaurantId "+restaurantId, shell=True)
    subprocess.call(" python run.py --prototxt mobilenet_ssd/MobileNetSSD_deploy.prototxt --model mobilenet_ssd/MobileNetSSD_deploy.caffemodel --restaurantId "+restaurantId+" --url "+config.url, shell=True)
    
    
    # else:
    #     messagebox.showerror("Invalid IP Address", "Please try again with a valid IP Address")
    #     entry.delete(0, END)
    #     entry1.delete(0, END)

app = Tk()

app.tk.call('source', 'forest-light.tcl')
ttk.Style().theme_use('forest-light')

app.title("Application for Training Model")
app.option_add("*tearOff", False)


# app.columnconfigure(index=0, weight=1)
# app.columnconfigure(index=1, weight=1)
# app.columnconfigure(index=2, weight=1)
# app.rowconfigure(index=0, weight=1)
# app.rowconfigure(index=1, weight=1)
# app.rowconfigure(index=2, weight=1)


#Initialize a Label to display the User Input
#ttk.Label(app, text="Enter the IP Address of the Server:").grid(row=0, column=0, sticky="nsew", padx=5, pady=5)

# label=Label(app, text="Enter Your CCTV's IP Address", font=("Arial 12"))
# label.grid(row=0, column=0, sticky="nsew", padx=5, pady=5)


#Create an Entry widget to accept User Input
# entry = ttk.Entry(width=30, font=("Arial 12"))
# entry.grid(row=2, column=0, padx=5, pady=(0, 10), sticky="ew")

# label1=Label(app, text="Enter restaurant Id", font=("Arial 12"))
# label1.grid(row=3, column=0, sticky="nsew", padx=5, pady=5)

ttk.Label(app, text="Enter the Restaurant ID:").grid(row=3, column=0, sticky="nsew", padx=5, pady=5)

entry1 = ttk.Entry(width=30, font=("Arial 12"))
entry1.grid(row=4, column=0, padx=5, pady=(0, 10), sticky="ew")

ttk.Label(app, text="Enter IP Camera URL").grid(row=5, column=0, sticky="nsew", padx=5, pady=5)
entry2 = ttk.Entry(width=30, font=("Arial 12"))
entry2.grid(row=6, column=0, padx=5, pady=(0, 10), sticky="ew")

# ttk.Label(app, text="Enter Password").grid(row=7, column=0, sticky="nsew", padx=5, pady=5)
# entry3 = ttk.Entry(width=30, font=("Arial 12"))
# entry3.grid(row=8, column=0, padx=5, pady=(0, 10), sticky="ew")

start_btn = ttk.Button(app, text="Start", style="Accent.TButton", command=run_program)
start_btn.grid(row=9, column=0,  padx=5, pady=5)

# cap = cv2.VideoCapture("videos/example_01.mp4")
# canvas = Canvas(app, width=1200, height=700)
# canvas.pack()

# Sizegrip
sizegrip = ttk.Sizegrip(app)
sizegrip.grid(row=100, column=100, padx=(0, 5), pady=(0, 5))


# Center the window, and set minsize
app.update()
app.minsize(app.winfo_width(), app.winfo_height())
x_cordinate = int((app.winfo_screenwidth()/2) - (app.winfo_width()/2))
y_cordinate = int((app.winfo_screenheight()/2) - (app.winfo_height()/2))
app.geometry("+{}+{}".format(x_cordinate, y_cordinate))

# Start the main loop
app.mainloop()