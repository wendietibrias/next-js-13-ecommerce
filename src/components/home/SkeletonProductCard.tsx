import Skeleton from 'react-loading-skeleton'
import React from 'react'

const SkeletonProductCard = () => {
  return (
     <div className="w-full">
        <Skeleton width="100%" height="220px"/>
        <div className="pt-3">
            <div className="flex justify-between items-center">
            <Skeleton width="100px" height="15px"/>
            <Skeleton width="50px" height="15px"/>
            </div>
                <Skeleton width="60px" height="12px" />
                <div className="mt-3">
                <Skeleton width="100%" height="20px"/>
                </div>
        </div>
     </div>
  )
}

export default SkeletonProductCard