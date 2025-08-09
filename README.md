Live Link- https://caption-generator-mocha.vercel.app/

# Caption Generator 🎬✨

An AI-powered web application that automatically generates and applies captions to your videos using AWS Transcribe and FFmpeg. Upload a video, get automated transcription, customize the caption appearance, and download your captioned video - all in your browser!

## 🚀 Features

- **Automatic Video Transcription**: Uses AWS Transcribe for accurate speech-to-text conversion
- **Real-time Caption Overlay**: Apply captions directly to your videos using FFmpeg WebAssembly
- **Customizable Caption Styling**: 
  - Choose primary text color
  - Customize outline color
  - Professional font rendering (Roboto)
- **Progress Tracking**: Real-time progress indicator during video processing
- **Browser-based Processing**: No server-side video processing needed
- **File Upload & Management**: Secure file upload with AWS S3 integration
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Video Processing**: FFmpeg WebAssembly
- **Transcription**: AWS Transcribe
- **Storage**: AWS S3
- **Styling**: Tailwind CSS with custom components
- **HTTP Client**: Axios

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- AWS account with S3 and Transcribe services configured
- AWS credentials properly set up

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/caption-generator.git
   cd caption-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your AWS credentials:
   ```env
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   AWS_REGION=your_aws_region
   AWS_S3_BUCKET_NAME=your_s3_bucket_name
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage

1. **Upload Video**: Click the upload area and select your video file
2. **Wait for Transcription**: The app will automatically upload to S3 and start transcription
3. **Review Captions**: View the generated transcription items with timestamps
4. **Customize Appearance**: Choose colors for caption text and outline
5. **Apply Captions**: Click "Apply Captions" to process the video
6. **Download Result**: Once processing is complete, download your captioned video

## 🏗️ Project Structure

```
caption-generator/
├── src/
│   ├── app/
│   │   ├── [fileName]/          # Dynamic route for individual videos
│   │   │   └── page.js          # Video processing and caption application
│   │   ├── api/
│   │   │   ├── proxy-video/     # Video streaming proxy
│   │   │   ├── transcribe/      # AWS Transcribe integration
│   │   │   └── upload/          # File upload to S3
│   │   ├── components/
│   │   │   ├── DemoSection.js   # Demo/example section
│   │   │   ├── PageHeader.js    # Header component
│   │   │   ├── UploadForm.js    # File upload interface
│   │   │   └── transcriptionItem.js # Individual caption item
│   │   ├── fonts/               # Custom fonts (Roboto)
│   │   └── page.js             # Main landing page
│   └── public/
│       └── ffmpeg/             # FFmpeg WebAssembly files
├── package.json
└── README.md
```

## 🔄 API Endpoints

- `POST /api/upload` - Upload video files to S3
- `GET /api/transcribe?filename=xyz` - Get transcription status and results
- `GET /api/proxy-video?fileName=xyz` - Stream video files from S3

## 🎨 Customization

### Caption Styling
You can modify caption appearance by adjusting the FFmpeg filter parameters in the `transcode` function:

- **Font Size**: Change `FontSize=30` 
- **Position**: Modify `MarginV=70`
- **Font Family**: Update font files in `/fonts` directory

### UI Themes
The app uses Tailwind CSS for styling. Primary colors and themes can be customized in the component files.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FFmpeg](https://ffmpeg.org/) for video processing capabilities
- [AWS Transcribe](https://aws.amazon.com/transcribe/) for speech-to-text services
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling

## 🐛 Troubleshooting

### Common Issues

1. **FFmpeg Loading Issues**: Ensure all FFmpeg WebAssembly files are in the `public/ffmpeg/` directory
2. **AWS Permissions**: Make sure your AWS credentials have access to S3 and Transcribe services
3. **Video Upload Failures**: Check your S3 bucket permissions and CORS configuration

### Support

If you encounter any issues, please open an issue on GitHub or contact the maintainers.

---
