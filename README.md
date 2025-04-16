# ⏳ Aesthetic Pomodoro Timer

A beautiful and functional Pomodoro Timer app built with **React** and **Tailwind CSS**. It helps you stay focused with ambient background audio, background video, and customizable session durations.

## 🚀 Features

- 🎯 Classic Pomodoro technique (Focus + Break)
- 🕒 Customizable focus and break durations
- 🔁 Animated progress ring
- 🎵 Ambient sound with **mute** and **volume control**
- 🎬 Fullscreen background video
- ✅ Task list with add/delete functionality
- 📊 Pomodoro session counter
- 🧘 Smooth UI transitions


![Screenshot 2025-04-16 190721](https://github.com/user-attachments/assets/a62debd1-766d-4370-be88-bf944622ffeb)


## 🛠️ Tech Stack

- React (Vite)
- Tailwind CSS
- HTML5 Audio & Video
- Local State Management (`useState`, `useEffect`)

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 16
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/pomodoro-timer.git
cd pomodoro-timer
npm install
```

### Run the App

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## 🔧 Customization

- Change background video: Replace `src/assets/bg-video.mp4`
- Change ambient sound: Replace `src/assets/ambient.mp3`
- Modify bell sound: Replace `public/assets/bell.wav`
- Adjust default durations: Modify `durations` in `App.jsx`

## 📁 File Structure

```
src/
├── assets/                # Background video & ambient sound
├── components/
│   ├── Controls.jsx
│   ├── ProgressRing.jsx
│   ├── SettingsModal.jsx
│   ├── TaskList.jsx
│   └── Timer.jsx
├── App.jsx
├── main.jsx
├── index.css
```

## 🤝 Contributing

Feel free to fork the repo and submit pull requests! Open issues if you find bugs or have feature suggestions.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙏 Acknowledgements

- [Pixabay](https://pixabay.com/) for free background videos and ambient sounds

---

Stay focused. Stay calm. ✨
