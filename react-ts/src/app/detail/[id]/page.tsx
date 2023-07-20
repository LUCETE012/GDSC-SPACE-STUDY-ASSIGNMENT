import { useNavigate, useParams } from 'react-router-dom'
import { Diary } from '../../../interface/diary'
import { useDiaryUpdate, useDiaryValue } from '../../../provider/Diary'
import { Link } from '../../../components/Link'
import { DIARY_STORAGE_KEY } from '../../page'

type DiaryDetailPageParams = {
    id: string
}

export default function DiaryDetailPage() {
    const { id } = useParams<DiaryDetailPageParams>()

    const diary: Diary | undefined = useDiaryValue().find((diary) => diary.id === id)

    if(diary === undefined) throw Error("No Diary!")

    const parsedDate = typeof diary.date === 'string' ? new Date(diary.date) : diary.date

    const formattedDate = Intl.DateTimeFormat('ko-KR',
        {dateStyle: 'full'}
    ).format(parsedDate)
    
    const nowId = id
    const setDiary = useDiaryUpdate()
    const navigate = useNavigate()
    const removeDiary = () => { 
        setDiary((prev) => {
            const removedDiary = prev.filter(({id}) => id !== nowId)
            window.localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(removedDiary))
            return removedDiary
        })
        navigate("/")
    }

    return (
        <div className="flex item-center justify-center min-h-screen max-h-screen h-screen w-full bg-white ">
            <div className="w-2/4 h-full py-20">
                <h1 className="flex item-start justfiy-center text-3xl font-bold">{diary.title}</h1>
                <div className="flex flex-row item-center justify-between gap-2 my-9">
                    <div className="flex item-center border border-gray-100 justify-center w-full bg-gray-100 rounded-xl p-2 text-gray-500 text-sm hover:border-gray-500"> {formattedDate} </div>
                    <div className="flex item-center border border-gray-100 justify-center w-full bg-gray-100 rounded-xl p-2 text-gray-500 text-sm hover:border-gray-500"> {diary.weather} </div>
                    <Link to={`/emotions/${diary.emotion}`} className="flex item-center w-full justify-center border border-gray-100 bg-gray-100 rounded-xl p-2 text-gray-500 text-sm hover:border-gray-500"> {diary.emotion} </Link>
                </div>
                <div className="text-base text-gray-800 h-2/3">{diary.content}</div>
                <div className="flex flex-row item-center justify-between">
                    <Link to="/" className="flex item-center w-full justify-center rounded-xl border border-emerald-100 bg-emerald-100 text-emerald-500 p-2 m-1 hover:border-emerald-500">새로운 일기 작성하기</Link>
                    <button onClick={removeDiary} className="flex item-center w-full justify-center rounded-xl border border-red-100 bg-red-100 text-red-500 p-2 m-1 hover:border-red-500">현재 일기 삭제하기</button>
                </div>

            </div>
        </div>
    )
}
