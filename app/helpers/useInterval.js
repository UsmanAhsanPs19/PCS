import React, { useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
    const saveCallback = useRef();

    // Remember the latest callback
    useEffect(() => {
        saveCallback.current = callback
    }, [])

    //setup an interval
    useEffect(() => {
        function hitCallback() {
            saveCallback.current();
        }

        if (delay != null) {
            let id = setInterval(hitCallback, delay);
            return () => clearInterval(id)
        }
    }, [delay])
}