'use client'

import React, { useEffect, useState } from 'react'
import { Orbitron } from 'next/font/google'
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { ChevronDown } from "lucide-react";


const orbitron = Orbitron({subsets: ['latin'] });


function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pomoCount, setPomoCount] = useState(0);
  const [isNotBreak, setIsNotBreak] = useState(true);

  useEffect(()=> {
    let timer: NodeJS.Timeout;

    if(isRunning){
      timer = setInterval(() => {
        if(seconds === 0){
          if(minutes === 0){
            clearInterval(timer);
            setIsRunning(false);
            if (isNotBreak) {setPomoCount((prev) => prev + 1);}
            handlePomoTime();
            setIsNotBreak(true);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000)
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds, minutes, isNotBreak])

  const handleStart = () => {
    setIsRunning(true);
  }
  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
  }
  const handleDecrease = () => {
    if ( pomoCount !== 0 ) 
      {setPomoCount((prev) => prev - 1);}
  }

  const handlePomoTime = () => {
    setMinutes(25);
    setIsNotBreak(true);
  }
  const handleBreakTime = () => {
    setMinutes(5);
    setIsNotBreak(false);
  }

  return (
    <div className='flex m-5 mx-auto w-3/4 gap-3'> {/* Pomodoro Space*/}

      <div className='p-3 border-3 rounded-md w-2/3'> {/* Pomodoro Timer*/}

        <div className='flex items-center justify-between px-5'>
            <h1 className='text-gray-800 text-lg'>Pomodoro</h1>
            <DropdownMenu>
            <DropdownMenuTrigger><div className='flex items-end'>Choose Timer<ChevronDown className='h-5 w-5'/></div></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handlePomoTime}>Pomodore</DropdownMenuItem>
                <DropdownMenuItem onClick={handleBreakTime}>Break</DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className='flex justify-center m-8'>
            <h1 className={`${orbitron.className} text-8xl text-gray-800 font-orbitron font-bold`}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </h1>
        </div>

        <div className='flex justify-center items-center gap-2 m-3'>
          <Button className='bg-gray-800 hover:bg-gray-700 hover:scale-105' onClick={handleStart}>{isRunning ? 'Running...' : 'Start'}</Button>
          <Button className='bg-gray-800 hover:bg-gray-700 hover:scale-105' onClick={handleReset}>Reset</Button>
        </div>

      </div>

      <div className='p-3 border-3 border-gray-700 rounded-md w-1/3 bg-gray-800'> {/* Pomodoro Counter*/}
        <div className='flex items-start'>
            <h1 className='text-gray-100'>Pomodoro Counter here</h1>
        </div>
        <div className='flex justify-center m-8'>
            <h1 className={`${orbitron.className} text-8xl text-gray-100 font-orbitron font-bold`}>
              {String(pomoCount).padStart(2, '0')}
            </h1>
        </div>
        <div className='flex justify-center items-center gap-2 m-3'>
            <Button className='bg-gray-200 text-gray-800 hover:bg-gray-50 hover:scale-105' onClick={handleDecrease}>Decrease</Button>
        </div>
      </div>

    </div>
  )
}

export default Pomodoro
