import { useDarkMode } from '../contexts/DarkModeContext'

const DarkModeTest = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()
  
  return (
    <div className="p-4">
      <p>Current mode: {darkMode ? 'Dark' : 'Light'}</p>
      <button 
        onClick={toggleDarkMode}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Dark Mode
      </button>
    </div>
  )
}

export default DarkModeTest
