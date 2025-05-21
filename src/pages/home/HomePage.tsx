import styled from "styled-components";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";

type Menu = {
    id: number;
    name: string;
    selected: boolean;
}

function HomePage() {
    return <div className="w-full h-full flex items-center justify-center p-10">
        <Card className="overflow-hidden">
            <CardContent className="grid grid-cols-5 gap-8">
                <div className="col-span-3">
                    <div className="flex flex-col items-center text-center gap-1">
                        <h1 className="text-6xl">🍽️</h1>
                        <h1 className="text-2xl font-bold">Lunch Menu Roulette!</h1>
                        <p className="text-xl text-slate-600">
                            먹고싶은 메뉴를 추가하고 룰렛을 돌려보세요!
                        </p>
                    </div>
                    <div className="relative w-full h-1 border-t-1 border-slate-400 mt-4 mb-4"/>
                    <div className="w-full h-100 flex justify-center items-center text-center bg-slate-50 rounded-2xl">
                        룰렛자리
                    </div>
                    <Button className="w-full pl-4 pr-4 mt-4 bg-slate-700">
                        Spin!
                    </Button>
                </div>
                <form className="p-6 gap-6 bg-slate-50 rounded-2xl col-span-2">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <div></div>
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input type="email" placeholder="Menu" className="bg-white"/>
                                <Button type="submit" className="bg-slate-700">+ Add</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
}

const HomeWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
`

export default HomePage;