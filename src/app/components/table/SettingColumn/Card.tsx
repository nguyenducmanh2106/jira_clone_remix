import type { CSSProperties, FC } from 'react'
import { memo, useMemo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { Checkbox } from '@app/components/Checkbox'
import {
    DragHandleDots2Icon
} from '@radix-ui/react-icons';
const style: CSSProperties = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
}

export interface CardProps {
    id: any
    text: string
    moveCard: (draggedId: string, id: string) => void
}

export const Card: FC<CardProps> = memo(function Card({ id, text, moveCard }: CardProps) {
    const ref = useRef(null)
    const [{ isDragging, handlerId }, connectDrag, preview] = useDrag({
        type: ItemTypes.CARD,
        item: { id },
        collect: (monitor) => {
            const result = {
                handlerId: monitor.getHandlerId(),
                isDragging: monitor.isDragging(),
            }
            return result
        },
    })

    const [, connectDrop] = useDrop({
        accept: ItemTypes.CARD,
        hover({ id: draggedId }: { id: string; type: string }) {
            if (draggedId !== id) {
                moveCard(draggedId, id)
            }
        },
    })

    connectDrag(ref)
    connectDrop(ref)
    const opacity = isDragging ? 0 : 1
    const containerStyle = useMemo(() => ({ ...style, opacity }), [opacity])
    return (
        <div ref={preview} style={containerStyle} data-handler-id={handlerId}>
            <Checkbox />
            <div ref={ref} className='cursor-move mx-[4px]'>
                <DragHandleDots2Icon />
            </div>
            {text}
        </div>
    )
})
