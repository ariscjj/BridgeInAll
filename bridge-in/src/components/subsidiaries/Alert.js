import React from 'react'

export default function Alert({show,
    onHide,
    children,
    variant = 'success',
    ...others}) {
  return (
    <>
    {
      show ?
        <div
          {...others}
          className={"alert container d-flex justify-content-between alert-success mt-4"}
          role="alert"
        >
          <div>{children}</div>

          {
            onHide ?
              <div
                style={{ cursor: 'pointer' }}
                onClick={onHide}>
                X
              </div>
              :
              <></>
          }
        </div>
        :
        <></>
    }
  </>
  )
}
