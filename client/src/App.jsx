import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import AdminWrapper from "./pages/AdminWrapper"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
