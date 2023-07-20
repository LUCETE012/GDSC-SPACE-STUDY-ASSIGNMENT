import { useParams } from 'react-router-dom'
import { Diary } from '../../../interface/diary'
import { EMOTION_DATA } from '../../../constatnts'
import { useDiaryUpdate, useDiaryValue } from '../../../provider/Diary'
import { useState } from 'react'
import { Link } from '../../../components/Link'
import { DIARY_STORAGE_KEY } from '../../../constatnts'

const DiaryTable = ({
    diary,
    setRemoveSelected,
} : {
    diary: Diary
    setRemoveSelected: React.Dispatch<React.SetStateAction<string[]>>
}) => {
    const { id, date, title, views } = diary
    const parsedDate = typeof date === 'string' ? new Date(date) : date
    const formattedDate = Intl.DateTimeFormat('ko-KR',
        {dateStyle: 'medium'}
    ).format(parsedDate)
    return (
        <div key={id} className="flex flex-row border border-gray-100 rounded-lg items-center justify-between gap-4 w-full p-2"> 
            <input type="checkbox" className="2-4 h-4 accent-gray-50"
            onChange={({target: {checked}}) => {
                if (checked) {
                    setRemoveSelected((selected) => [...(selected ?? []), diary.id])
                } else {
                    setRemoveSelected((selected) => selected?.filter((id) => id !== diary.id))
                }
            }}/>
            <Link to={`/detail/${id}`} className="flex flex-row w-full items-center justify-between">
                <div>{title}</div>
                <div className="flex flex-row gap-2">
                    <div className="flex items-center justify-center text-gray-400">{formattedDate}</div>
                    <div className="flex items-center justify-center text-gray-400">조회수: {views}</div>
                </div>

            </Link>
        </div>
    )

}

type EmotionPageParams = {
    emotion: Diary['emotion']
}

export default function EmotionPage() {
    const { emotion } = useParams<EmotionPageParams>()
    if (emotion === undefined) throw Error("undefined")

    const emotionDiary = useDiaryValue().filter((diary) => diary.emotion === emotion)
    const isEmotionDiaryExists = emotionDiary.length > 0
    const [removeSelected, setRemoveSelected] = useState<string[]>([])
    const isRemoveSelected = removeSelected.length > 0

    const setDiary = useDiaryUpdate()
    const remove = (removeId: string) => {
        setDiary((prev) => {
            const removedDiary = prev.filter(({id}) => id !== removeId)
            window.localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(removedDiary))
            return removedDiary
        })

    }

    const removeSelectDiary = () => {
        removeSelected.forEach((id) => remove(id))
    }
    
    const color = EMOTION_DATA[emotion].color
    const buttonColor = isRemoveSelected ? "red" : "gray"
    return (
        <div className="bg-white h-full w-full flex items-center justify-center">
             <div className="flex flex-col w-full gap-10 md:w-2/3 items-start">
                <div className="flex flex-row w-full items-center justify-start gap-5">
                    <div className={`flex items-center justify-center border border-${color}-100 bg-${color}-50 w-24 h-24 min-h-[6rem] min-w-[6rem] rounded-2xl text-6xl group-hover:shadow-inner group-hover:bg-${color}-100`}>{EMOTION_DATA[emotion].emoji}</div>
                    <h1 className="flex items-center justify-center text-3xl font-medium"> {EMOTION_DATA[emotion].description} </h1>
                </div>
                {
                    isEmotionDiaryExists ? (
                        <>
                        {emotionDiary.map((diary) => (
                            <DiaryTable key={diary.id} diary={diary} setRemoveSelected={setRemoveSelected} />
                        )
                        )} 
                        <button disabled={!isRemoveSelected} onClick={removeSelectDiary} className={`flex items-center justify-center bg-${buttonColor}-100 border border-${buttonColor}-100 text-${buttonColor}-500 w-full p-2 rounded-xl hover:border-${buttonColor}-500`}>
                            {isRemoveSelected ? `선택된 ${removeSelected.length}개의 일기를 삭제 합니다`
                            : '선택된 일기가 없습니다'}
                        </button>
                        </>
                    ) :
                    (
                        <div className="text-gray-500"> 아직 적지 않았어요! </div>
                    )
                }
            </div>
        </div>
        
    )
}
