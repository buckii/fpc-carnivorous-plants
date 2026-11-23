// Keep every field-note fact in the photo-driven lesson, including previously hidden facts.
export function createLessonSteps(subject) {
  const images = [...subject.lesson.map(step => step.image), ...subject.sections.filter(section => section.image).map(section => section.image)]
    .filter((image, index, all) => all.findIndex(other => other.src === image.src) === index)
  const steps = subject.lesson.map(step => ({ image: step.image, heading: subject.name, body: step.fact }))
  function addStep(heading, body, preferredImage, video) {
    const previous = steps[steps.length - 1].image.src
    const image = preferredImage && preferredImage.src !== previous
      ? preferredImage
      : images.find((candidate, index) => index >= steps.length % images.length && candidate.src !== previous)
        || images.find(candidate => candidate.src !== previous)
    steps.push({ heading, body, image, video })
  }
  subject.sections.forEach(section => {
    if (section.items) section.items.forEach(item => addStep(section.heading, item, section.image))
    else addStep(section.heading, section.body, section.image)
  })
  if (subject.video) addStep('Watch & discover', subject.video.title, {
    src: subject.video.image,
    alt: `${subject.name} video preview from the original slides`,
  }, subject.video)
  const annotatedSteps = []
  steps.forEach((step, index) => {
    const annotation = subject.partAnnotations?.[index + 1]
    const discovery = annotation ? { ...step, image: annotation.image || step.image, annotation } : { ...step }
    if (!annotation && annotatedSteps.at(-1)?.image.src === discovery.image.src) {
      discovery.image = images.find(image => image.src !== discovery.image.src)
    }
    annotatedSteps.push(discovery)
  })
  return annotatedSteps
}
