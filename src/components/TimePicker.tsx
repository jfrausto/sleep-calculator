import React, {useState} from 'react';
import useCalculateCycle from "../utils/useCalculateCycle";
import Select, {SingleValue} from 'react-select';
import SolutionDisplay from './SolutionDisplay';
import { hoursSelect, minutesSelect, meridiemSelect } from '../utils/timeChoices';
import usePrevious from '../utils/usePrevious';
import { add, remove } from '../utils/notification-util';
import {motion, AnimatePresence} from 'framer-motion'
import { CloseButton } from './CloseButton';
// import { ErrorMsg } from '../utils/notification-util';



export type TimePickerProps = {
  method: "asleepBy" | "wakeUpAt",
};

export interface ErrorMsg {
  errorType: "no set time" | "enter new time",
  message: "enter a valid time!" | "enter a new time!"
}
export interface Notifications extends ErrorMsg {
  id: number,
}


const TimePicker: React.FC<TimePickerProps> = ({method}) => {
  
  const [selectedHours, setSelectedHours] = useState<SingleValue<{value: string, 
    label: string}>>();
  const prevHours = usePrevious(selectedHours?.value);
  const [selectedMinutes, setSelectedMinutes] = useState<SingleValue<{value: string, 
    label: string}>>();
  const prevMinutes = usePrevious(selectedMinutes?.value);
  const [selectedMeridiem, setSelectedMeridiem] = useState<SingleValue<{value: string, 
    label: string}>>();
  const prevMeridiem = usePrevious(selectedMeridiem?.value);
  const [solutionArray, setSolutionArray] = useState<string[]>();



  const [notifications, setNotifications] = useState<Notifications[]>([]);


  const handleChangeHours = (obj: SingleValue<{value: string, 
    label: string}>) => {
    setSelectedHours(obj);
  }
  const handleChangeMinutes = (obj: SingleValue<{value: string, 
    label: string}>) => {
    setSelectedMinutes(obj);
  }
  const handleChangeMeridiem = (obj: SingleValue<{value: string, 
    label: string}>) => {
    setSelectedMeridiem(obj);
  }
  const handleSubmitTime = () => {
    // ! https://codesandbox.io/s/framer-motion-notifications-5cvo9?file=/src/index.tsx
    // use this example to implement an alert!
    if (selectedHours?.value === undefined || 
      selectedMinutes?.value === undefined || 
      selectedMeridiem?.value === undefined){
        const msg: ErrorMsg = {
          errorType: "no set time",
          message: "enter a valid time!"
        };
        setNotifications(add(notifications, msg));
        return;
    }
    if(selectedHours?.value === prevHours && 
      selectedMinutes?.value === prevMinutes && 
      selectedMeridiem?.value === prevMeridiem){
        const msg: ErrorMsg = {
          errorType: "enter new time",
          message: "enter a new time!"
        };
        setNotifications(add(notifications, msg));
        return;
    }

    const {timeArray, message} = useCalculateCycle({
      time: `${selectedHours?.value}:${selectedMinutes?.value} ${selectedMeridiem?.value}`,
      method: method
    });
  
    setSolutionArray(timeArray);
  };


  return (
    <div
        className=" flex flex-col items-start justify-start 
                    gap-8 p-4 min-h-[200px] 
                    bg-gradient-to-br from-purple-300 to-pink-200"
      >
        <ul 
          className="p-0 m-0 fixed bottom-0 right-0 top-0 
                    flex flex-col list-none justify-start"
        >
          <AnimatePresence>
            {
              notifications.map( notif => (
                <motion.li
                  key={notif.id}
                  // positionTransition
                  className={`relative w-60 m-3 flex-grow-0 flex-shrink-0 basis-24 
                            bg-red-200 rounded-lg ${ notif.errorType === "no set time" ? "bg-blue-200" : "bg-purple-200"}`}
                  layout="position"
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                >
                  <p 
                    className={`relative top-12 left-4 
                              text-xl italic`} 
                    
                  >
                    {notif.message}
                  </p>
                  <CloseButton
                      color={notif.errorType}
                      close={() => setNotifications(remove(notifications, notif.id))}
                  />
                </motion.li>
              ))
            }
          </AnimatePresence>
        </ul>
        <div
          className='flex flex-row items-start justify-start gap-4'
        >

          <Select 
            options={hoursSelect}
            instanceId={"hours"}
            // className="rounded-2xl"
            // className="w-20"
            onChange={(option) => handleChangeHours(option)}
            blurInputOnSelect
          />
          <Select 
            options={minutesSelect}
            instanceId={"minutes"}
            // className="w-20"
            onChange={(option) => handleChangeMinutes(option)}
            blurInputOnSelect
          />
          <Select 
            options={meridiemSelect}
            instanceId={"meridiem"}
            // className="w-20"
            onChange={(option) => handleChangeMeridiem(option)}
            blurInputOnSelect
          />

          <button
            // type='submit'
            onClick={() => {
              // setIsLoading(true)
              handleSubmitTime()
            }}
            className="p-2 bg-slate-100 rounded-md"
          >
            Calculate
          </button>
        </div>

      
        {
          solutionArray ? 
          <SolutionDisplay solutionArray={solutionArray} /> 
          : <p>Pick a valid time!</p>
        }

        {/* <p
          className=" text-xl pt-4 text-amber-800"
        > */}
          {/* {message} */}
        {/* </p> */}

      </div>
  )
}

export default TimePicker