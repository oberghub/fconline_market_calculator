import { useState } from "react";
import "./App.css";

function App() {
  const [price, setPrice] = useState<number>(0);
  const [vipSelected, setVipSelected] = useState<string>("");
  const [couponSelected, setCouponSelected] = useState<string>("");
  const [pcDiscount, setPcDiscount] = useState<boolean>(false);
  // #07f468
  // #747474
  // #4c5051
  //colors
  const CurrencyFormatter = (price: number) => {
    const formatter = new Intl.NumberFormat()
    return formatter.format(price)
  } 
  const marketTax = () => {
    const basePrice = Math.floor(price * 0.6)
    const taxPrice = tax_40();
    let discount = 0;
    //selected vip choice
    if(vipSelected !== "") {
      discount = discount + taxPrice * (vipSelected == "VIP" ? 0.1 : 0.2)
    }
    if(pcDiscount) {
      discount = discount + taxPrice * 0.1
    }
    if(couponSelected !== "") {
      discount = discount + taxPrice * (parseInt(couponSelected) / 100)
    }
    const res = Math.floor(basePrice + discount)
    return CurrencyFormatter(res);
  };
  const tax_40 = () => {
    return Math.floor(price * 0.4);
  }
  const handleVipSelected = (vipType: string) => {
    if (vipSelected == vipType) {
      setVipSelected(() => "");
    } else {
      setVipSelected(() => vipType);
    }
  };
  const handleCouponSelected = (couponType: string) => {
    if (couponSelected == couponType) {
      setCouponSelected(() => "");
    } else {
      setCouponSelected(() => couponType);
    }
  };
  const resetValue = () => {
    setPrice(() => 0)
    setVipSelected(() => "")
    setCouponSelected(() => "")
    setPcDiscount(() => false)
  }
  return (
    <>
      <div className={`flex flex-col gap-2 w-[800px] h-[500px] bg-transparent m-auto`}>
        <div className="relative rounded flex flex-col bg-[#07f468] p-3">
          <h1 className="m-auto text-black font-bold text-3xl">FC ONLINE Tax Calculator</h1>
          <p>By โอมเทียร์แปด</p>
          <p className="text-xs text-gray-600">Version 1.0.0</p>
          <u onClick={() => resetValue()} className="absolute right-3 top-3 cursor-pointer">Reset</u>
        </div>
        <div className="rounded flex p-3 bg-[#ccccca] gap-3 items-center">
          <label>ราคา</label>
          <input
            value={price}
            className="outline-none text-lg bg-[#e4e4e2] p-2 rounded font-bold"
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
            }}
            type="number"
          />
        </div>
        <div className="rounded flex p-3 bg-[#ccccca] gap-3">
          <p className="flex gap-3 items-center">
            ภาษีตลาด 40%{" "}
            <strong
              style={{ display: price == 0 ? "none" : "flex" }}
              className="text-red-500 text-2xl"
            >
              -{CurrencyFormatter(Math.floor(price * 0.4))}
            </strong>
          </p>
        </div>
        <div className="rounded flex p-3 bg-[#ccccca] gap-3">
          <p>ส่วนลด</p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div
                onClick={() => handleVipSelected("SVIP")}
                style={{borderColor: vipSelected == "SVIP" ? 'lightcoral' : 'black'}}
                className="border-dotted border border-black"
              >
                <p>SVIP 20%</p>
              </div>
              <div
                onClick={() => handleVipSelected("VIP")}
                style={{borderColor: vipSelected == "VIP" ? 'lightcoral' : 'black'}}
                className="border-dotted border border-black"
              >
                <p>VIP 10%</p>
              </div>
              <div
                style={{borderColor: pcDiscount ? 'lightcoral' : 'black'}}
                onClick={() => setPcDiscount(!pcDiscount)}
                className="border-dotted border border-black"
              >
                <p>PC 10%</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div
                style={{borderColor: couponSelected == "40" ? 'lightcoral' : 'black'}}
                onClick={() => handleCouponSelected("40")}
                className="border-dotted border border-black"
              >
                <p>CP 40%</p>
              </div>
              <div
                style={{borderColor: couponSelected == "30" ? 'lightcoral' : 'black'}}
                onClick={() => handleCouponSelected("30")}
                className="border-dotted border border-black"
              >
                <p>CP 30%</p>
              </div>
              <div
                style={{borderColor: couponSelected == "20" ? 'lightcoral' : 'black'}}
                onClick={() => handleCouponSelected("20")}
                className="border-dotted border border-black"
              >
                <p>CP 20%</p>
              </div>
              <div
                style={{borderColor: couponSelected == "10" ? 'lightcoral' : 'black'}}
                onClick={() => handleCouponSelected("10")}
                className="border-dotted border border-black"
              >
                <p>CP 10%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded flex p-3 bg-[#ccccca] gap-3">
          <ul className="text-left">
            <p className="font-bold">ส่วนลดค่าภาษี</p>
            <li className="gap-1" style={{display : !vipSelected ? 'none' : 'flex'}}>
              {vipSelected == "VIP"
                ? "VIP 10%"
                : "SVIP 20%"
              }
              <strong className="text-[#1ac05d]">+{CurrencyFormatter(Math.floor(tax_40() * (vipSelected == "VIP" ? 0.1 : 0.2)))}</strong>
            </li>
            <li className="gap-1" style={{display: pcDiscount ? "flex" : "none"}}>
              PC 10
              <strong className="text-[#1ac05d]">+{CurrencyFormatter(Math.floor(tax_40() * (vipSelected == "VIP" ? 0.1 : 0.2)))}</strong>
            </li>
            <li className="gap-1" style={{ display: !couponSelected ? "none" : "flex" }}>
              Coupon ({couponSelected}%)
              <strong className="text-[#1ac05d]">+{CurrencyFormatter(Math.floor(tax_40() * (parseInt(couponSelected) / 100)))}</strong>
            </li>
          </ul>
        </div>
        <div className="rounded flex p-3 bg-[#ccccca] gap-3">
          <p className="flex gap-3 items-center" onClick={() => console.log(vipSelected)}>
            คงเหลือ{" "}
            <strong
              style={{ display: price == 0 ? "none" : "flex" }}
              className={`text-[#4c5051] text-2xl`}
            >
              {marketTax()} BP
            </strong>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
