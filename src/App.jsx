import { useState, useEffect } from 'react'
import gameData from './data/game.json'

import SiteFooter from './components/layout/SiteFooter.jsx'
import HomeScreen from './components/screens/HomeScreen.jsx'
import TutorialScreen from './components/screens/TutorialScreen.jsx'
import GuideHubScreen from './components/screens/GuideHubScreen.jsx'
import ResourcesScreen from './components/screens/ResourcesScreen.jsx'
import TipsScreen from './components/screens/TipsScreen.jsx'
import PromptsScreen from './components/screens/PromptsScreen.jsx'
import SceneScreen from './components/screens/SceneScreen.jsx'
import SubjectDetailScreen from './components/screens/SubjectDetailScreen.jsx'
import EndScreen from './components/screens/EndScreen.jsx'

const { meta, navigation, screens, subjects, mascot } = gameData
const { subjectScreenIds, homeScreenId, sceneScreenId, endScreenId } = navigation

const screenComponentMap = {
  home: HomeScreen,
  tutorial: TutorialScreen,
  'teachers-guide': GuideHubScreen,
  'additional-resources': ResourcesScreen,
  'tips-tricks': TipsScreen,
  'prompts-projects': PromptsScreen,
  [sceneScreenId]: SceneScreen,
  [endScreenId]: EndScreen,
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(homeScreenId)
  const [visitedSubjects, setVisitedSubjects] = useState(new Set())
  const [allDiscovered, setAllDiscovered] = useState(false)

  useEffect(() => {
    document.title = meta.title
  }, [])

  function navigate(screenId) {
    setCurrentScreen(screenId)
    window.scrollTo(0, 0)

    if (subjectScreenIds.includes(screenId)) {
      setVisitedSubjects((prev) => {
        const next = new Set(prev)
        next.add(screenId)
        if (next.size === subjectScreenIds.length) {
          setAllDiscovered(true)
        }
        return next
      })
    }
  }

  const activeSubject = subjects.find((s) => s.id === currentScreen)

  if (activeSubject) {
    return (
      <>
        <SubjectDetailScreen
          subject={activeSubject}
          meta={meta}
          onNavigate={navigate}
        />
        <SiteFooter text={meta.footerText} />
      </>
    )
  }

  const ScreenComponent = screenComponentMap[currentScreen]

  if (!ScreenComponent) return null

  const screenData = currentScreen === sceneScreenId
    ? screens[sceneScreenId]
    : screens[currentScreen]

  const commonProps = { screen: screenData, meta, onNavigate: navigate }

  let screenElement
  if (currentScreen === sceneScreenId) {
    screenElement = (
      <ScreenComponent
        {...commonProps}
        subjects={subjects}
        mascot={mascot}
        visitedSubjects={visitedSubjects}
        allDiscovered={allDiscovered}
      />
    )
  } else {
    screenElement = <ScreenComponent {...commonProps} />
  }

  return (
    <>
      {screenElement}
      <SiteFooter text={meta.footerText} />
    </>
  )
}
