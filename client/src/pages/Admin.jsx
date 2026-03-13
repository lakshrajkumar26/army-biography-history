import { useEffect, useState } from "react"
import axios from "axios"

export default function Admin() {
  const [heroes, setHeroes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingHero, setEditingHero] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "Army",
    years: "",
    image: "",
    bio: "",
    timeline: []
  })
  const [timelineEntry, setTimelineEntry] = useState({ year: "", event: "" })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchHeroes()
  }, [])

  const fetchHeroes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/heroes")
      setHeroes(res.data)
    } catch (err) {
      console.error("Error fetching heroes:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async () => {
    if (!imageFile) return null

    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('image', imageFile)

    try {
      const res = await axios.post('http://localhost:5000/api/upload/image', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setUploading(false)
      return `http://localhost:5000${res.data.imageUrl}`
    } catch (err) {
      console.error('Error uploading image:', err)
      setUploading(false)
      alert('Error uploading image')
      return null
    }
  }

  const handleAddTimeline = () => {
    if (timelineEntry.year && timelineEntry.event) {
      setFormData({
        ...formData,
        timeline: [...formData.timeline, timelineEntry]
      })
      setTimelineEntry({ year: "", event: "" })
    }
  }

  const handleRemoveTimeline = (index) => {
    setFormData({
      ...formData,
      timeline: formData.timeline.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Upload image if file is selected
      let imageUrl = formData.image
      if (imageFile) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      const heroData = { ...formData, image: imageUrl }

      if (editingHero) {
        await axios.put(`http://localhost:5000/api/heroes/${editingHero._id}`, heroData)
        alert("Hero updated successfully!")
      } else {
        await axios.post("http://localhost:5000/api/heroes", heroData)
        alert("Hero added successfully!")
      }
      resetForm()
      fetchHeroes()
    } catch (err) {
      console.error("Error saving hero:", err)
      alert("Error saving hero")
    }
  }

  const handleEdit = (hero) => {
    setEditingHero(hero)
    setFormData({
      name: hero.name,
      title: hero.title,
      category: hero.category,
      years: hero.years,
      image: hero.image,
      bio: hero.bio,
      timeline: hero.timeline || []
    })
    setImagePreview(hero.image)
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hero?")) {
      try {
        await axios.delete(`http://localhost:5000/api/heroes/${id}`)
        alert("Hero deleted successfully!")
        fetchHeroes()
      } catch (err) {
        console.error("Error deleting hero:", err)
        alert("Error deleting hero")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      category: "Army",
      years: "",
      image: "",
      bio: "",
      timeline: []
    })
    setEditingHero(null)
    setShowForm(false)
    setImageFile(null)
    setImagePreview("")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel - Manage Heroes</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {showForm ? "Cancel" : "+ Add New Hero"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-[#2a2a2a] p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {editingHero ? "Edit Hero" : "Add New Hero"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  >
                    <option value="Army">Army</option>
                    <option value="Air Force">Air Force</option>
                    <option value="Navy">Navy</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Years *</label>
                  <input
                    type="text"
                    name="years"
                    value={formData.years}
                    onChange={handleInputChange}
                    placeholder="e.g., 1974 - 1999"
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Hero Image *</label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-600"
                    />
                  </div>
                )}

                {/* Upload Image File */}
                <div className="mb-4">
                  <label className="block mb-2 text-sm text-gray-400">Upload Image File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-red-600 file:text-white file:cursor-pointer hover:file:bg-red-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">Max size: 5MB. Formats: JPG, PNG, GIF, WEBP</p>
                </div>

                {/* OR divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-600"></div>
                  <span className="px-4 text-gray-500">OR</span>
                  <div className="flex-1 border-t border-gray-600"></div>
                </div>

                {/* Image URL Input */}
                <div>
                  <label className="block mb-2 text-sm text-gray-400">Enter Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Biography *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="5"
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Timeline Section */}
              <div>
                <label className="block mb-2 font-semibold">Timeline</label>
                <div className="flex gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Year"
                    value={timelineEntry.year}
                    onChange={(e) => setTimelineEntry({ ...timelineEntry, year: e.target.value })}
                    className="w-32 bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    placeholder="Event"
                    value={timelineEntry.event}
                    onChange={(e) => setTimelineEntry({ ...timelineEntry, event: e.target.value })}
                    className="flex-1 bg-[#1a1a1a] border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTimeline}
                    className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded transition-colors"
                  >
                    Add
                  </button>
                </div>

                {formData.timeline.length > 0 && (
                  <div className="space-y-2">
                    {formData.timeline.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 bg-[#1a1a1a] p-3 rounded">
                        <span className="font-bold text-red-400">{item.year}</span>
                        <span className="flex-1">{item.event}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTimeline(index)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {uploading ? "Uploading..." : editingHero ? "Update Hero" : "Add Hero"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Heroes List */}
        <div className="bg-[#2a2a2a] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#1a1a1a]">
              <tr>
                <th className="text-left p-4">Image</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Years</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {heroes.map((hero) => (
                <tr key={hero._id} className="border-t border-gray-700 hover:bg-[#333]">
                  <td className="p-4">
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className="w-16 h-16 object-cover rounded grayscale"
                    />
                  </td>
                  <td className="p-4 font-semibold">{hero.name}</td>
                  <td className="p-4">{hero.title}</td>
                  <td className="p-4">{hero.category}</td>
                  <td className="p-4">{hero.years}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(hero)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(hero._id)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
