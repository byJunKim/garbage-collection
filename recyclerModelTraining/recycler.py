import torch
import torch.nn as nn
import nn.functional as F


class recycler(nn.Module):
    def __init__(self):
        super(recycler, self).__init__()
        self.name = "recycler"
        self.conv1 = nn.Conv2d(3, 5, 5)
        self.conv2 = nn.Conv2d(5, 7, 5)
        self.conv3 = nn.Conv2d(7, 5, 3)
        self.pool1 = nn.MaxPool2d(4, 4)
        self.pool2 = nn.MaxPool2d(2, 2)
        #self.fc1 = nn.Linear(7130, 1024)
        self.fc2 = nn.Linear(700, 6)
        #self.fc3 = nn.Linear(512, 6)
    
    def forward(self, x):
        x = self.pool1(F.relu(self.conv1(x)))
        x = self.pool1(F.relu(self.conv2(x)))
        x = self.pool2(F.relu(self.conv3(x)))
        x = x.view(x.size(0), -1)
        #x = F.relu(self.fc1(x))
        x = self.fc2(x)
        #x = self.fc3(x)
        x = x.squeeze(1)
        return x


model = recycler()


def takeImage(image):
    trans = transforms.ToTensor()
    image = trans(image)
    model.load_state_dict(torch.load("./trainedModel/recycler.pt"))
    output = model(image.view(-1, 3, 384, 512))
    output = F.softmax(output, dim = 1)
    prediction, idx = torch.max(output, 1)
    
    idxToClass = dict({0:'Cardboard',1:'Glass',2:'Metal', 3:'Paper', 4:'Plastic', 5:'Trash'})
    return idxToClass[int(idx)]