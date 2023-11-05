import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import BoxShadow from './pages/BoxShadow/BoxShadow'
import LinerGradient from './pages/LinerGradient/LinerGradient'
import TextShadow from './pages/TextShadow/TextShadow'
import QRcode from './pages/QR/QR.jsx'
import MyPage from './pages/MyPage/MyPage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ImgFilter from './pages/ImgFilter/ImgFilter'
import QR from './pages/QR/QR.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boxshadow" element={<BoxShadow />} />
        <Route path="/linergradient" element={<LinerGradient />} />
        <Route path="/textshadow" element={<TextShadow />} />
        <Route path="/imgfilter" element={<ImgFilter />} />
        <Route path="/qrcode" element={<QR />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
