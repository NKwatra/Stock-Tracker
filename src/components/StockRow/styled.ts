import styled from '@emotion/styled';
import { GRAY, LIGHT_GRAY, LIGHT_GREEN, RED } from '../../utils/colors';

type PriceProps = {
    readonly increase: boolean
}

type ContainerProps = {
    readonly selected: boolean
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
export const Entry = styled.div<ContainerProps>`
    background: ${props => props.selected ? LIGHT_GRAY: "transparent"};
    margin-left: ${props => props.selected ? "-24px" : "0"};
    margin-right: ${props => props.selected ? "-24px" : "0"};
    padding-left: ${props => props.selected ? "24px" : "0"};
    padding-right: ${props => props.selected ? "24px" : "0"};
    padding-bottom: ${props => props.selected ? "24px" : "0"};
    margin-bottom : ${props => props.selected ? "-24px" : "0"}
`