import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import BoxShadow from './pages/BoxShadow/BoxShadow'
import LinerGradient from './pages/LinerGradient/LinerGradient'
import TextShadow from './pages/TextShadow/TextShadow'
import QRCode from './pages/QRCode/QRCode'
import MyPage from './pages/MyPage/MyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boxshadow" element={<BoxShadow />} />
        <Route path="/linergradient" element={<LinerGradient />} />
        <Route path="/textshadow" element={<TextShadow />} />
        <Route path="/qrcode" element={<QRCode />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
