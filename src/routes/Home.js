import React, { useEffect, useState } from 'react';
import { Title } from '../components/Title';
import { useFirestore } from '../hooks/useFirestore';
import {Button} from '../components/Button';

export const Home = () => {

    const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore();
    const [text, setText] = useState('');
    const [newOriginID, setNewOriginID] = useState();

    useEffect(() => {
      console.log('getData')
      getData()
    }, [])


    if(loading.getData) return <p>Loading getData...</p>
    if (error) return <p>{error}</p>
    
    const handleSubmit = async(e) => {
      e.preventDefault();

      if (newOriginID) {
        await updateData(newOriginID,text)
        setNewOriginID('');
        setText('');
        return
      }

      await addData(text)
      console.log(text);
      setText('');
    }

    const handleClickDelete = async(nanoid) =>  {
      console.log("click delete")
      await deleteData(nanoid)
    }

    const handleClickEdit = (item) => {
      setText(item.origin)
      setNewOriginID(item.nanoid);
      console.log(item.origin);
    }



  return (
    <>
        <Title title="Home" />

        <form onSubmit={handleSubmit}>
          <input 
            placeholder="ex: https://cortinaspuertomontt.cl"
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          {
            newOriginID ? 
            (
              <Button 
                type="submit"
                text="Actualizar Url"
                color="yellow"
                loading={loading.updateData}
              />
            ) : (
              <Button 
                type="submit"
                text="Add Url"
                color="yellow"
                loading={loading.addData}
              />
            )
            
          }



        </form>



        {
          data.map((item) => (
            <div key={item.nanoid}>
              <p>{item.nanoid}</p>
              <p>{item.origin}</p>
              <p>{item.uid}</p>
              <Button 
                type="button"
                text="Delete"
                color="red"
                loading={loading[item.nanoid]}
                onClick={() => handleClickDelete(item.nanoid)}
              />
              <Button 
                type="button"
                text="Editar"
                color="green"
                // loading={loading.updateData}
                onClick={() => handleClickEdit(item)}
              />

            </div>
          ))
        }
    </>
  )
}
