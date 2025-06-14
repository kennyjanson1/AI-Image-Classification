import tensorflow as tf
import os

# Enable memory growth for GPU (prevents TensorFlow from allocating all GPU memory)
gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)

import cv2
import imghdr
from matplotlib import pyplot as plt
import numpy as np

# Load and inspect a sample image from the dataset
img = cv2.imread(os.path.join('data/', 'FAKE', 'AdobeStock_559145847.jpeg'))
img.shape

# ==================== Load Dataset ====================

# Load image dataset from 'data/' directory, resizing all images to 32x32
data = tf.keras.utils.image_dataset_from_directory('data', image_size=(32, 32))

# Preview one batch from the dataset
data_it = data.as_numpy_iterator()
batch = data_it.next()

# Plot the first 8 images in the batch with their corresponding labels
fig, ax = plt.subplots(ncols=8, figsize=(10, 10))
for idx, img in enumerate(batch[0][:8]):
    ax[idx].imshow(img.astype(int))
    ax[idx].title.set_text(batch[1][idx])

# ==================== Preprocessing ====================

# Print the pixel value range before scaling
print(batch[0].min())
print(batch[0].max())

# Normalize image data to range [0, 1]
data = data.map(lambda x, y: (x / 255, y))

# Verify normalization
scaled_it = data.as_numpy_iterator()
batch = scaled_it.next()
print(batch[0].min())
print(batch[0].max())

# ==================== Split Dataset ====================

# Define split sizes: 70% train, 20% validation, 10% test
train_size = int(len(data) * 0.7)
cv_size = int(len(data) * 0.2)
test_size = int(len(data) * 0.1) + 1

# Create train, validation, and test sets
train = data.take(train_size)
cv = data.skip(train_size).take(cv_size)
test = data.skip(train_size + cv_size).take(test_size)

# ==================== Build Model ====================

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten

# Create a CNN model
model = Sequential()
model.add(Conv2D(16, (4, 4), 1, activation='relu', input_shape=(32, 32, 3)))
model.add(MaxPooling2D())
model.add(Conv2D(32, (4, 4), 1, activation='relu'))
model.add(MaxPooling2D())
model.add(Conv2D(16, (4, 4), 1, activation='relu'))
model.add(MaxPooling2D())
model.add(Flatten())
model.add(Dense(32, activation='relu'))
model.add(Dense(1, activation='sigmoid'))  # Binary classification

# Compile the model with Adam optimizer and binary crossentropy loss
model.compile('adam', loss=tf.losses.BinaryCrossentropy(), metrics=['accuracy'])

model.summary()

# ==================== Train Model ====================

# Set up TensorBoard callback
logdir = 'logs'
tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=logdir)

# Train the model with validation data
hist = model.fit(train, epochs=20, validation_data=cv, callbacks=[tensorboard_callback])

# ==================== Visualize Performance ====================

# Plot training and validation loss
fig = plt.figure()
plt.plot(hist.history['loss'], color='blue', label='loss')
plt.plot(hist.history['val_loss'], color='orange', label='val_loss')
fig.suptitle('Loss', fontsize=20)
plt.legend(loc="upper left")
plt.show()

# Plot training and validation accuracy
fig = plt.figure()
plt.plot(hist.history['accuracy'], color='blue', label='accuracy')
plt.plot(hist.history['val_accuracy'], color='orange', label='val_accuracy')
fig.suptitle('Accuracy', fontsize=20)
plt.legend(loc="upper left")
plt.show()

# ==================== Evaluate Model ====================

from tensorflow.keras.metrics import Precision, Recall, BinaryAccuracy

pre = Precision()
rec = Recall()
acc = BinaryAccuracy()

# Evaluate model on test dataset
for batch in test.as_numpy_iterator():
    X, y = batch
    yhat = model.predict(X)
    pre.update_state(y, yhat)
    rec.update_state(y, yhat)
    acc.update_state(y, yhat)

# Print final evaluation metrics
print(f'Precision: {pre.result().numpy()}, Recall: {rec.result().numpy()}, Accuracy: {acc.result().numpy()}')

# ==================== Save and Reload Model ====================

# Save trained model to disk
model.save(os.path.join('model', 'ai_imageclassifier.h5'))

# Load the saved model for inference
model = load_model(os.path.join('model', 'ai_imageclassifier.h5'))

# ==================== Make a Prediction ====================

# Load and preprocess a single external image
img = cv2.imread('ex6.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(img)
plt.show()

# Resize image to 32x32 and normalize
resize = tf.image.resize(img, (32, 32))

# Predict and interpret the result
y_pred = model.predict(np.expand_dims(resize / 255, 0))

if y_pred > 0.5:
    print(f'Predicted class: REAL')
else:
    print(f'Predicted class: AI')
