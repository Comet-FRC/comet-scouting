import math
import cv2

def decodeNumber(data) :
  # create a variable to store decoded data
  decoded = 0

  # loop backwards through the data
  for i in range(len(data) - 1, -1, -1) :
      # add the current character's value to the decoded number
      decoded += ("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~\\".index(data[i])) * 91 ** (len(data) - 1 - i)

  # return the decoded number
  return decoded

  

# initalize the camera and qrcode detector
cap = cv2.VideoCapture(0)
detector = cv2.QRCodeDetector()

# create a variable to store qr code data
qr_data = ""

# loop until a qr code is found
while True:
    # read the currect camera image
    ret, image = cap.read()

    #  check if frame was read successfully
    if ret:
        # display the current image
        cv2.imshow("QR Code Scanner", image)

        # wait for a millisecond and check if a key was pressed
        if cv2.waitKey(1) != -1:
            break

        # check the image for a qr code
        data, bbox, _ = detector.detectAndDecode(image)

        # if a qr code is found, print and store the data and stop searching
        if data:
            print(data)
            qr_data = data
            break
    else :
        break
    


# release the camera and close the window
cap.release()
cv2.destroyAllWindows()

# create a variable to store the decoded data
decoded = ""

# decode the inital match and team data
decoded += "Match Number: " + str(decodeNumber(qr_data[0:1])) + "\n"
decoded += "Team Number: " + str(decodeNumber(qr_data[1:4])) + "\n"

# decode the game event data

events = {
    "1": "L1 Scored",
    "2": "L2 Scored",
    "3": "L3 Scored",
    "4": "L4 Scored",

    "p": "Processor Scored",
    "n": "Net Scored"
}

# create a variable to store the location of the next non game data
location = 0

for i in range(4, len(qr_data) - 1, 3) : 
    # if the next thing isn't an event store the location and break
    if not (qr_data[i] in events):
        location = i
        break
    # otherwise decode the event and time 
    decoded += events[qr_data[i]] + ": \t" + str(decodeNumber(qr_data[i + 1:i + 3]) / 10.0) + " seconds\n"



# decode the endgame data
# positions = {
#     "x": "None",
#     "d": "Deep",
#     "s": "Shallow",
#     "k": "Park"
# }

# decoded += "End Position: " + positions[qr_data[location]] + "\n"

# decode the tags

# print the decoded data
print(decoded)

# TODO: add the data to a database or find a place to put it

