import React from 'react'
import { Orbitron } from 'next/font/google'
import { Button } from './ui/button';

const orbitron = Orbitron({subsets: ['latin'] });

function Pomodoro() {
  return (
    <div className='flex m-5 mx-auto w-3/4 gap-3'> {/* Pomodoro Space*/}

      <div className='p-3 border-2 rounded-md w-2/3'> {/* Pomodoro Timer*/}
        <div className='flex items-start'>
            <h1 className='text-gray-800'>Pomodoro</h1>
        </div>
        <div className='flex justify-center m-8'>
            <h1 className={`${orbitron.className} text-8xl text-gray-800 font-orbitron font-bold`}>
              25:00
            </h1>
        </div>
        <div className='flex justify-center items-center gap-2 m-3'>
          <Button>Start</Button>
          <Button>Reset</Button>
        </div>
      </div>

      <div className='p-3 border-2 rounded-md w-1/3'> {/* Pomodoro Counter*/}
        <div className='flex items-start'>
            <h1 className='text-gray-800'>Pomodoro Counter here</h1>
        </div>
        <div className='flex justify-center m-8'>
            <h1 className={`${orbitron.className} text-8xl text-gray-800 font-orbitron font-bold`}>
              00
            </h1>
        </div>
      </div>

    </div>
  )
}

export default Pomodoro
