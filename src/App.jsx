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
import ChallengeScreen from './components/screens/ChallengeScreen.jsx'

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
  const allDiscovered = visitedSubjects.size === subjectScreenIds.length

  useEffect(() => {
    document.title = meta.title
  }, [])

  function navigate(screenId) {
    if (screenId === 'restart') {
      setVisitedSubjects(new Set())
      setCurrentScreen(homeScreenId)
      window.scrollTo(0, 0)
      return
    }
    if ((screenId === 'challenge' || screenId === endScreenId) && !allDiscovered) return
    setCurrentScreen(screenId)
    window.scrollTo(0, 0)

  }

  function completeLesson(screenId) {
    setVisitedSubjects(prev => {
      const next = new Set(prev)
      next.add(screenId)
      return next
    })
  }

  useEffect(() => {
    const heading = document.querySelector('h1, h2')
    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }
  }, [currentScreen])

  const activeSubject = subjects.find((s) => s.id === currentScreen)

  if (activeSubject) {
    return (
      <>
        <SubjectDetailScreen
          key={activeSubject.id}
          subject={activeSubject}
          onComplete={completeLesson}
          meta={meta}
          onNavigate={navigate}
        />
        <SiteFooter text={meta.footerText} />
      </>
    )
  }

  if (currentScreen === 'challenge') return <><ChallengeScreen challenge={gameData.challenge} subjects={subjects} onNavigate={navigate} /><SiteFooter text={meta.footerText} /></>

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
