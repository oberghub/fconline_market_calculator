import { useState } from "react";
import "./App.css";
import ToggleButton from "./ToggleButton";
import MainLayout from "./MainLayout";

function App() {
  const [privilageDiscount, setPrivilageDiscount] = useState<string[]>([]);
  type Player = {
    name: string
    price: number
    quantity: number
    selected: boolean
    coupon: string
  }
  const [player, setPlayer] = useState<Player[]>([
    {
      name: "Player 1",
      price: 0,
      quantity: 1,
      selected: true,
      coupon: ''
    }
  ])
  // #07f468
  // #747474
  // #4c5051
  //colors
  const CurrencyFormatter = (price: number) => {
    const formatter = new Intl.NumberFormat()
    return formatter.format(price)
  }
  const DiscountMenu = ({index, coupon}: {index: number, coupon: string}) => (
  <select value={coupon} onChange={(e) => handleDiscountSelected(e.target.value, index)} className="w-20 h-10 border border-gray-200 rounded-[10px]">
    <option value={'0'}>ไม่ใช้</option>
    <option value={'10'}>10%</option>
    <option value={'20'}>20%</option>
    <option value={'30'}>30%</option>
    <option value={'40'}>40%</option>
  </select>
  )
  const addPlayer = () => {
    const blank: Player = {
      name: `Player ${player.length+1}`,
      price: 0,
      quantity: 1,
      selected: true,
      coupon: ''
    }
    setPlayer([...player, blank])
  }
  const removePlayer = (pos: number) => {
    const blank: Player = {
      name: `Player 1`,
      price: 0,
      quantity: 1,
      selected: true,
      coupon: ''
    }
    if(pos === -1) {
      setPlayer([blank])
    } else {
      if (player.length === 1){
        setPlayer([blank])
      }
      else {
        setPlayer(player.filter((_, index) => index !== pos))
      }
    }
  }
  const handleChangeData = (name: string, value: any, pos: number) => {
    if(name === `quantity`) {
      const val = value < 1 ? 1 : value
      setPlayer(player.map((item, index) => {
        if(index === pos) {
          return {...item, [name]: val}
        } else {
          return item
        }
      }))
    }
    else {
      setPlayer(player.map((item, index) => {
        if(index === pos) {
          return {...item, [name]: value}
        } else {
          return item
        }
      }))
    }
  }
  const handleDiscountSelected = (choice: string, pos: number) => {
    setPlayer(player.map((item, index) => {
      if(index === pos) {
        return {...item, coupon: choice === item.coupon ? '' : choice}
      } else {
        return item
      }
    }))
  }
  const handlePrivilageDiscount = (val: string) => {
    if (privilageDiscount.includes(val)){
      setPrivilageDiscount(privilageDiscount.filter(item => item !== val))
    }
    else if(['VIP', 'SVIP'].includes(val)) {
      if(val === 'VIP'){
        setPrivilageDiscount([...privilageDiscount.filter(item => item !== 'SVIP'), val])
      }
      else if(val === 'SVIP'){
        setPrivilageDiscount([...privilageDiscount.filter(item => item !== 'VIP'), val])
      }
    }
    else {
      setPrivilageDiscount([...privilageDiscount, val])
    }
  }
  const tax_40_new = (price: number) => {
    return Math.floor(price * 0.4);
  }
  const resultCalc = (): string => {
    const res: number[] = player.filter(item => item.selected).map(item => parseInt(taxCalc(item.price * item.quantity, item.coupon).pricePerPlayer))
    return CurrencyFormatter(res.reduce((acc, cur) => acc + cur, 0))
  }
  type PriceType = {
    pricePerPlayer: string
    pricePerPlayerF: string
    allDiscountPrice: string
    pcDiscount: string
    vipDiscount: string
    couponDiscount: string
  }
  const taxCalc = (price:number, coupon:string): PriceType => {
    const basePrice = Math.floor(price * 0.6)
    const taxPrice = tax_40_new(price);
    let pcDiscount: number = 0
    let vipDiscount: number = 0
    let couponDiscount: number = 0
    let discount: number = 0
    if(privilageDiscount.includes("SVIP")){
      discount = discount + taxPrice * 0.2
      vipDiscount = vipDiscount + taxPrice * 0.2
    }
    if(privilageDiscount.includes("VIP")){
      discount = discount + taxPrice * 0.1
      vipDiscount = vipDiscount + taxPrice * 0.1
    }
    if(privilageDiscount.includes("PC")){
      discount = discount + taxPrice * 0.1
      pcDiscount = pcDiscount + taxPrice * 0.1
    }
    if(coupon === '40'){
      discount = discount + taxPrice * 0.4
      couponDiscount = couponDiscount + taxPrice * 0.4
    }
    if(coupon === '30'){
      discount = discount + taxPrice * 0.3 
      couponDiscount = couponDiscount + taxPrice * 0.3
    }    
    if(coupon === '20'){
      discount = discount + taxPrice * 0.2
      couponDiscount = couponDiscount + taxPrice * 0.2
    }
    if(coupon === '10'){
      discount = discount + taxPrice * 0.1
      couponDiscount = couponDiscount + taxPrice * 0.1
    }
    const pricePerPlayer = basePrice + discount
    //[ราคารายคน, ลดราคารวม, เงินสุทธิ]
    const result: PriceType = {
      pricePerPlayer: pricePerPlayer.toString(),
      pricePerPlayerF: CurrencyFormatter(pricePerPlayer),
      allDiscountPrice: CurrencyFormatter(Math.floor(discount)),
      pcDiscount: CurrencyFormatter(pcDiscount),
      vipDiscount: CurrencyFormatter(vipDiscount),
      couponDiscount: CurrencyFormatter(couponDiscount)
    }
    return result
  }
  const handleSelectedPlayerList = (pos: number) => {
    if(pos === -1) {
      const selectedAll = player.filter(item => item.selected).length === player.length
      if (!selectedAll) {
        setPlayer(player.map((item) => {
          return {...item, selected: true}
        }))
      }
      else {
        setPlayer(player.map((item) => {
          return {...item, selected: false}
        }))
      }
    }
    else {
      setPlayer(player.map((item, index) => {
        if(index === pos) {
          return {...item, selected: !item.selected}
        }
        else {
          return item
        }
      }))
    }
  }
  return (
    <MainLayout>
      <div className={`flex flex-col gap-6 w-full mb-6`}>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex w-full gap-2 justify-between items-center bg-white shadow-md p-4 rounded-[20px]">
            <div className="flex gap-2">
              <div className="bg-gray-800 py-1 px-2 rounded-[10px] select-none">
                <p className="text-[#c2ad44] font-bold">SVIP</p>
              </div>
              <div className="bg-gray-800 py-1 px-2 rounded-[10px] select-none">
                <p className="text-white font-bold">20%</p>
              </div>
            </div>
            <ToggleButton enabled={privilageDiscount.includes('SVIP')} onToggle={() => handlePrivilageDiscount('SVIP')} width={48} />
            </div>
          <div className="flex w-full gap-2 justify-between items-center bg-white shadow-md p-4 rounded-[20px]">
            <div className="flex gap-2">
              <div className="bg-gray-800 py-1 px-2 rounded-[10px] select-none">
                <p className="text-[#cc683d] font-bold">VIP</p>
              </div>
              <div className="bg-gray-800 py-1 px-2 rounded-[10px] select-none">
                <p className="text-white font-bold">10%</p>
              </div>
            </div>
            <ToggleButton enabled={privilageDiscount.includes('VIP')} onToggle={() => handlePrivilageDiscount('VIP')} width={48} />
            </div>
          <div className="flex w-full gap-2 justify-between items-center bg-white shadow-md p-4 rounded-[20px]">
            <div className="flex gap-2">
              <div className="bg-gray-800 py-1 px-2 rounded-[10px] select-none">
                <p className="text-[#68cfe3] font-bold">PC</p>
              </div>
              <div className="bg-gray-800 py-1 px-2 rounded-[10px] select-none">
                <p className="text-white font-bold">10%</p>
              </div>
            </div>
            <ToggleButton enabled={privilageDiscount.includes('PC')} onToggle={() => handlePrivilageDiscount('PC')} width={48} />
            </div>
        </div>
        <div className="relative w-full select-none flex justify-center items-center h-16 bg-[#D8D9D9]">
          <p className="text-2xl font-bold">Transfer Market</p>
          <button className=" absolute top-4 left-4 p-2 bg-[#07f468] rounded-[10px]" onClick={addPlayer}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 6.99969C13.5 7.41531 13.1656 7.74969 12.75 7.74969H7.75V12.7497C7.75 13.1637 7.41406 13.5 7 13.5C6.58594 13.5 6.25 13.1653 6.25 12.7497V7.74969H1.25C0.835938 7.74969 0.5 7.41406 0.5 7C0.5 6.58719 0.835938 6.24969 1.25 6.24969H6.25V1.24969C6.25 0.835625 6.58594 0.5 7 0.5C7.41406 0.5 7.75 0.835625 7.75 1.24969V6.24969H12.75C13.1656 6.24969 13.5 6.58719 13.5 6.99969Z" fill="black"/>
          </svg>
          </button>
        </div>
        <div className="xl:max-w-full overflow-y-auto">
        <table className="min-w-[1440px] xl:w-full table-auto">
          <thead>
            <tr className="bg-[#F4F6FA] h-14">
              <th className="text-center px-4"><ToggleButton enabled={player.filter(item => item.selected).length === player.length} onToggle={() => handleSelectedPlayerList(-1)} width={48} /></th>
              <th className="text-left px-4">ชื่อ</th>
              <th className="text-left px-4">ราคา</th>
              <th className="text-left px-4">จำนวน</th>
              <th className="text-left px-4">ลดหย่อนภาษี</th>
              <th className="text-left px-4">ภาษีตลาด</th>
              <th className="text-left px-4">ส่วนลด PC</th>
              <th className="text-left px-4">ส่วนลด VIP</th>
              <th className="text-left px-4">คูปองส่วนลด</th>
              <th className="text-left px-4">คงเหลือ</th>
              <th>                  
                <button className="p-2 border border-gray-100 bg-white rounded-[10px]" onClick={() => removePlayer(-1)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.25 7C0.834375 7 0.5 6.66563 0.5 6.25V1.75C0.5 1.33437 0.834375 1 1.25 1C1.66562 1 2 1.33437 2 1.75V4.25313L2.625 3.51875C3.90625 1.98125 5.84062 1 8 1C11.8656 1 15 4.13438 15 8C15 11.8656 11.8656 15 8 15C6.425 15 4.96875 14.4781 3.8 13.6C3.46875 13.35 3.40313 12.8813 3.65 12.55C3.89688 12.2188 4.36875 12.1531 4.7 12.4C5.61875 13.0906 6.75938 13.5 8 13.5C11.0375 13.5 13.5 11.0375 13.5 8C13.5 4.9625 11.0375 2.5 8 2.5C6.30312 2.5 4.78438 3.26875 3.775 4.48125L3.77187 4.4875L2.90937 5.5H5.75C6.16563 5.5 6.5 5.83437 6.5 6.25C6.5 6.66563 6.16563 7 5.75 7H1.25Z" fill="black"/>
                </svg>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {player.map((item, index) => (
              <tr className="bg-white border-b h-16" key={`player${index+1}`}>
                <td className="text-center px-4"><ToggleButton enabled={item.selected} onToggle={() => handleSelectedPlayerList(index)} width={48} /></td>
                <td className="text-left px-4"><input name="name" type="text" className="focus:select-none border-gray-200 border rounded-lg p-2" value={item.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeData(e.target.name, e.target.value, index)} /></td>
                <td className="text-left px-4"><input name="price" type="text" className="focus:select-none border-gray-200 border rounded-lg p-2" value={item.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeData(e.target.name, e.target.value, index)} /></td>
                <td className="text-left px-4"><input name="quantity" type="number" className="focus:select-none border-gray-200 border rounded-lg pl-2 pr-1 py-2 max-w-16" value={item.quantity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeData(e.target.name, e.target.value, index)} /></td>
                <td className="text-left px-4"><DiscountMenu index={index} coupon={item.coupon} /></td>
                <td className="text-left px-4 font-bold text-red-600">-{CurrencyFormatter(tax_40_new(item.price * item.quantity))}</td>
                <td className="text-left px-4 font-bold text-green-600">+{taxCalc(item.price * item.quantity, item.coupon).pcDiscount}</td>
                <td className="text-left px-4 font-bold text-green-600">+{taxCalc(item.price * item.quantity, item.coupon).vipDiscount}</td>
                <td className="text-left px-4 font-bold text-green-600">+{taxCalc(item.price * item.quantity, item.coupon).couponDiscount}</td>
                <td className="text-left px-4 font-bold text-[#349beb]">{taxCalc(item.price * item.quantity, item.coupon).pricePerPlayerF}</td>
                <td className="px-4">
                  <button className="p-2 border border-gray-100 bg-white rounded-[10px]" onClick={() => removePlayer(index)}>
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_12028_2624)">
                    <path d="M13.25 2.5C13.6656 2.5 14 2.83594 14 3.25C14 3.66563 13.6656 4 13.25 4H12.8875L12.1375 14.1469C12.0594 15.1906 11.1906 16 10.1438 16H3.85625C2.81 16 1.94031 15.1906 1.86281 14.1469L1.11125 4H0.75C0.335938 4 0 3.66563 0 3.25C0 2.83594 0.335938 2.5 0.75 2.5H2.93187L4.07812 0.779375C4.40312 0.292406 4.95 0 5.53438 0H8.46562C9.05 0 9.59688 0.292438 9.92188 0.779375L11.0688 2.5H13.25ZM5.53438 1.5C5.45312 1.5 5.34688 1.54188 5.32812 1.61125L4.73438 2.5H9.26562L8.67188 1.61125C8.625 1.54188 8.54688 1.5 8.46562 1.5H5.53438ZM11.3844 4H2.61531L3.35938 14.0375C3.37812 14.2969 3.59687 14.5 3.85625 14.5H10.1438C10.4031 14.5 10.6219 14.2969 10.6406 14.0375L11.3844 4Z" fill="#EF3E4C"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_12028_2624">
                    <rect width="14" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex flex-col items-end justify-between">
          <p className="text-gray-500">ราคา</p>
          <p className="text-[#349beb] text-4xl font-bold">{resultCalc()}</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
