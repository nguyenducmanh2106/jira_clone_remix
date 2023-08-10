import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"


import { CodeViewer } from "./components/code-viewer"
import { MaxLengthSelector } from "./components/maxlength-selector"
import { ModelSelector } from "./components/model-selector"
import { PresetActions } from "./components/preset-actions"
import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"
import { TemperatureSelector } from "./components/temperature-selector"
import { TopPSelector } from "./components/top-p-selector"
import { models, types } from "./data/models"
import { presets } from "./data/presets"
import { Textarea } from "../ui/textarea"
import { Separator } from "../ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Field } from "./components/field"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Container } from "./components/Container"
import { TouchBackend } from 'react-dnd-touch-backend'

export default function PlaygroundPage() {
  return (
    // <DndProvider backend={HTML5Backend}>
    //   <Container />
    // </DndProvider>
     <Container />
  )
}