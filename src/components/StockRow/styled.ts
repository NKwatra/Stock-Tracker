import styled from '@emotion/styled';
import { GRAY, LIGHT_GREEN, RED } from '../../utils/colors';

type PriceProps = {
    readonly increase: boolean
}

export const Name = styled.div`
    color: ${GRAY}
`

export const Bold = styled.div`
    color: #ffffff;
    font-weight: bold;
    font-size: 1.2rem;
`

export const Change = styled.div<PriceProps>`
    color: ${props => props.increase ? LIGHT_GREEN : RED};
    font-weight: 700;
    font-size: 1.1rem;
`