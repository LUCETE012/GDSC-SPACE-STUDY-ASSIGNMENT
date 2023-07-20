import { EMOTION_LIST } from "../../constatnts"
import { Diary } from "../../interface/diary"
import { Link } from "../../components/Link"

interface EmotionCardProps {
    emotion: Diary['emotion'],
    emoji: string,
    description: string
    color: string
}


const EmotionCard = ({ color, emoji, emotion, description }: EmotionCardProps) => {
    const upperEmotion = emotion[0].toUpperCase() + emotion.slice(1, emotion.length)
    return (
        <Link to={`/emotions/${emotion}`} className="flex flex-row group items-center justify-between gap-4 w-full p-4 rounded-3xl border border-gray-50  hover:border-transparent hover:shadow-2xl hover:scale-105">
            <div className={`flex items-center justify-center border border-${color}-100 bg-${color}-50 w-24 h-24 min-h-[6rem] min-w-[6rem] rounded-2xl text-6xl group-hover:shadow-inner group-hover:bg-${color}-100`}>{emoji}</div>
            <div className="flex flex-col items-start justify-center w-full">
                <h1 className="flex items-start justify-center font-bold text-2xl">{upperEmotion}</h1>
                <span className="flex items-start justify-center text-gray-400"> {description} </span>
            </div>
        </Link>
    )
}   

export default function EmotionLinkPage() {
    return (
        <div className="min-h-screen max-h-screen w-full bg-white h-screen w-full flex items-center justify-center">
            <div className="flex flex-col items-start justify-center gap-10">
                <div className="flex flex-col items-start justify-center gap-3">
                    <h1 className="text-3xl font-bold">
                        감정 상자
                    </h1>
                    <span className="text-gray-500">
                        나만의 감정을 돌아보고 생각에 잠겨보아요 :)
                    </span>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 gap-5 items-start justify-center">
                    {EMOTION_LIST.map((emotion) => (
                        <EmotionCard key={emotion.description} {...emotion}/>
                    ))}
                </div>
            </div>
        </div>
        
    )
}