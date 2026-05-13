FRAME SEQUENCE INSTRUCTIONS
============================

Place your video frames here as JPEG files with this naming convention:

  frame_001.jpg
  frame_002.jpg
  frame_003.jpg
  ...
  frame_120.jpg  (or however many frames you have)

HOW TO EXTRACT FRAMES FROM VIDEO:
----------------------------------
Using FFmpeg (recommended):

  ffmpeg -i your-video.mp4 -vf "fps=24,scale=1920:1080" public/frames/frame_%03d.jpg -q:v 3

This extracts frames at 24fps and saves them as JPEGs.

CONFIGURATION:
--------------
After adding your frames, open:
  src/components/VideoScrollSection.jsx

And update line 15:
  const TOTAL_FRAMES = 120  ← change to match your actual frame count

TIPS:
-----
- 60-120 frames gives smooth cinematic scrolling
- Use quality setting -q:v 2-4 for best size/quality balance
- 1920x1080 or 1280x720 recommended
- The scroll speed auto-adjusts to frame count
- The website shows a beautiful gradient fallback if no frames are present
