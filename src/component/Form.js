import {useFieldArray, useForm} from "react-hook-form";
import {useState} from "react";
import style from "./Form.module.css"
function Form() {
    const [back, setBack] = useState(false);
    const {control, reset, register, formState: {errors}, handleSubmit} = useForm({
        defaultValues:{
            cargo:[{count: 1,price:'',weight:'',length:'',width:'',height:''}],
            pallet:[{type: 'Палета від 1 м2 до 1,49 м2 (612)', price: '0', count: 0}]
        }
    });
    const {fields:fieldsPallet, append:appendPallet, remove:removePallet} = useFieldArray({
        control,
        name: "pallet",
    });
    const {fields:fieldsCargo, append:appendCargo, remove:removeCargo} = useFieldArray({
        control,
        name: "cargo",
    });
    const [type, setType] = useState('Вантажі')
    const onSubmit = value => {
        if(type==='Вантажі'){
            delete value?.pallet
        }else {
            delete value?.cargo
        }
        console.log(value, type)
    }
    function cargoForm() {
        return <div>
            <div>
                {fieldsCargo.map((item, index) => (
                    <div className={style.type} key={item.id}>

                        <input {...register(`cargo.${index}.count`)} min={1} type="number" />
                        <div>
                            <input {...register(`cargo.${index}.price`,{
                                required:true
                            })}type="text"/>
                            <div>{errors?.['cargo']?.[index]?.['price'] && <span>Це поле обов'язкове</span>}</div>
                        </div>
                        <div>
                            <input {...register(`cargo.${index}.weight`,{
                                required:true
                            })}type="text"/>
                            <div>{errors?.['cargo']?.[index]?.['weight'] && <span>Це поле обов'язкове</span>}</div>
                        </div>
                        <div>
                            <input {...register(`cargo.${index}.length`,{
                                required:true
                            })}type="text"/>
                            <div>{errors?.['cargo']?.[index]?.['length'] && <span>Це поле обов'язкове</span>}</div>
                        </div>
                        <div>
                            <input {...register(`cargo.${index}.width`,{
                                required:true
                            })}type="text"/>
                            <div>{errors?.['cargo']?.[index]?.['width'] && <span>Це поле обов'язкове</span>}</div>
                        </div>
                        <div>
                            <input {...register(`cargo.${index}.height`,{
                                required:true
                            })}type="text"/>
                            <div>{errors?.['cargo']?.[index]?.['width'] && <span>Це поле обов'язкове</span>}</div>
                        </div>

                        <button type="button" onClick={() => removeCargo(index)}>Delete</button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={() => appendCargo({count: 1,price:'',weight:'',length:'',width:'',height:''})}>Додати</button>
        </div>
    }

    function palletForm() {

        return <div>
            <div>
                {fieldsPallet.map((item, index) => (
                    <div className={style.type} key={item.id}>
                        <select {...register(`pallet.${index}.type`)}>
                            <option value="Палета від 1 м2 до 1,49 м2 (612)">Палета від 1 м2 до 1,49 м2 (612)</option>
                            <option value="Палета від 1,5 м2 до 2 м2 (816)">Палета від 1,5 м2 до 2 м2 (816)</option>
                            <option value="Палета від 0,5 м2 до 0,99 м2 (408)">Палета від 0,5 м2 до 0,99 м2 (408)</option>
                        </select>
                        <div>
                            <input {...register(`pallet.${index}.price`,{
                                required:true
                            })} type="text"/>
                            <div>{errors?.['pallet']?.[index]?.['price'] && <span>Це поле обов'язкове</span>}</div>
                        </div>
                        <input {...register(`pallet.${index}.count`)} min={1} type="number"/>
                        <button type="button" onClick={() => removePallet(index)}>Delete</button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={() => appendPallet({type: 'Палета від 1 м2 до 1,49 м2 (612)', price: '0', count: 0})}>Додати</button>
        </div>
    }

    return <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
            <p>Маршрут</p>
            <div className={style.сity}>
                <div>
                    <p>Місто-відправник</p>
                    <select {...register('cityFrom')}>
                        <option value='Віниця'>Віниця</option>
                        <option value='Житомир'>Житомир</option>
                        <option value='Київ'>Київ</option>
                        <option value='Бердичів'>Бердичів</option>
                        <option value='Коростень'>Коростень</option>
                    </select>
                </div>
                <div>
                    <p>Місто-одержувач</p>
                    <select {...register('cityIn')}>
                        <option value='Віниця'>Віниця</option>
                        <option value='Житомир'>Житомир</option>
                        <option value='Київ'>Київ</option>
                        <option value='Бердичів'>Бердичів</option>
                        <option value='Коростень'>Коростень</option>
                    </select>
                </div>

            </div>
        </div>
        <div>
            <p>Вид відправлення</p>
            <select {...register('typeOfShipment')} onChange={(e) => {
                setType(e.target.value)
                reset({
                    cargo:[{count: 1,price:'',weight:'',length:'',width:'',height:''}],
                    pallet:[{type: 'Палета від 1 м2 до 1,49 м2 (612)', price: '0', count: 0}]
                })
            }}>
                <option value='Вантажі'>Вантажі</option>
                <option value='Палети'>Палети</option>
            </select>
        </div>
        <div style={{marginTop:'10px'}}>
            {
                type === 'Вантажі' ? cargoForm() : palletForm()
            }
        </div>
        <div>
            <p>Послуга "Підйом на поверх"</p>
            <input type={"number"} min={0} {...register('town',{
                required: "This input is required.",
                pattern: {
                    value: /\d+/,
                    message: "This input is number only."
                },
                minLength: {
                    value: 0,
                    message: "This input must exceed 0 characters"
                },
                maxLength:{
                    value: 2,
                    message: "This input must exceed 3 characters"
                }
            })}/>
            <p>кількість поверхів</p>
            <input type={"checkbox"} {...register('Lift')}/>
        </div>
        <div>
            <p>Послуга "Зворотна доставка"</p>
            <input className='back' type={"checkbox"} {...register('Back')} onChange={()=>setBack(!back)}/>
            { back === true &&(
                <div  className='marsh'>
                    <p>Вид зворотної доставки</p>
                    <select {...register('backDeliver')}>
                        <option>Документи</option>
                        <option>Грошовий переказ</option>
                    </select>
                </div>
            )
            }
        </div>
        <input type="submit"/>
    </form>

}

export default Form;