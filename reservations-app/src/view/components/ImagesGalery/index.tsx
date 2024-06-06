import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

interface ImagesGaleryProps {
    imagesArray: string[],
}

export default function ImagesGalery({ imagesArray }: ImagesGaleryProps) {
    return (
        <ImageList
            sx={{ width: 600, height: 700, backgroundColor: "#ffffff" }}
            variant="quilted"
            cols={4}
            rowHeight={121}
        >
            {imagesArray.map((img, index) => (
                <ImageListItem key={img} cols={2} rows={2}>
                    <img
                        {...srcset(img, 121, 2, 2)}
                        alt='local'
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

