import { useState } from "react";
import Watch from "./Watch";

function WatchForm () {
    const [form, setForm] = useState ({
        city: '',
        zone: ''
    });
    const [dataList, setList] = useState([
        {city: 'Moscow', zone: '3'},
        {city: 'Ekaterinburg', zone: '5'},
        {city: 'London', zone: '0'}
    ]);

    const handleChange = ({target}) => {
        const name = target.name;
        const value = target.value;
        setForm(prevForm => ({...prevForm, [name]: value}));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        setList(prevList => {
            prevList.push({
                city: form.city,
                zone: form.zone,
            });
            return [...prevList];
        })

        setForm({city: '', zone: ''});  
    }

    const clickToDelete = (evt) => {
        const index = dataList.findIndex((item) => item.city === evt.target.dataset.city);
        if (index === -1) {
            console.log('Что-то пошло не так')
            return;
        } 
        setList(prevList => {
            prevList.splice(index, 1);
            return [...prevList];
        })
    }

    return (
        <div className="box">
            <form onSubmit={handleSubmit}>
                <div className="formBox">
                    <div className="inputBox">
                        <label htmlFor="city">Название</label>
                        <input id="city" name="city" onChange={handleChange} value={form.city} />
                    </div>
                    <div className="inputBox">
                        <label htmlFor="zone">Временная зона</label>
                        <input id="zone" name="zone" onChange={handleChange} value={form.zone} />
                    </div>
                    <button className="btn" type="submit">Добавить</button>
                </div>
            </form>
            <div className="table">
                {dataList.map(
                    o => <Watch key={o.city} item={o} delWatch={clickToDelete} />
                )}
            </div>
        </div>
    )
}

export default WatchForm;