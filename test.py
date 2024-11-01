import cv2
import numpy as np

PIXEL_TO_METER = 0.0002645833  # Conversion factor from pixels to meters

def calculate_speed(video_path):
    # Open the video file
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error opening video file")
        return None

    fps = cap.get(cv2.CAP_PROP_FPS)
    print(fps)
    total_distance = 0
    last_position = None
    frames_processed = 0
    ball_detected = False

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break  # Exit loop if no frame is returned

        # Convert frame to HSV for color detection
        hsv_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

        # Define the red color range (you may need to adjust this)
        lower_red = np.array([0, 100, 100])
        upper_red = np.array([10, 255, 255])
        mask = cv2.inRange(hsv_frame, lower_red, upper_red)

        # Find contours of the red area
        contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        # Detect the ball
        if contours:
            ball_detected = True
            largest_contour = max(contours, key=cv2.contourArea)
            x, y, w, h = cv2.boundingRect(largest_contour)  # Get bounding box
            ball_position = (x + w // 2, y + h // 2)  # Get the center position of the ball

            # Calculate distance if the ball was detected previously
            if last_position is not None:
                distance = np.sqrt((ball_position[0] - last_position[0]) ** 2 + 
                                   (ball_position[1] - last_position[1]) ** 2)
                total_distance += distance

            last_position = ball_position
            frames_processed += 1

        # Show the frame with the detection (optional)
        cv2.imshow("Frame", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Calculate speed
    cap.release()
    cv2.destroyAllWindows()

    if frames_processed > 0:
        time_in_seconds = frames_processed / fps
        speed_in_pixels_per_second = total_distance / time_in_seconds
        print(speed_in_pixels_per_second)
        print(f"Total distance: {total_distance:.2f} pixels")
        speed_in_meters_per_second = speed_in_pixels_per_second * PIXEL_TO_METER
        speed_in_kmh = speed_in_meters_per_second * 3.6  # Convert to km/h

        print(f"Ball speed: {speed_in_kmh:.2f} km/h")
        print(f"Frames Processed: {frames_processed}")
        print(f"Ball Detected: {ball_detected}")
    else:
        print("No frames processed.")

# Example usage
calculate_speed("SmoothSwing-VAUULAC42.mp4")
