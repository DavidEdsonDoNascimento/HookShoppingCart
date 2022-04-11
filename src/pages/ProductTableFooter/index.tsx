import { Total } from "../CartTable/styles";

type FooterProps = {
    total: string;
}

export const ProductTableFooter = ({ total }: FooterProps) => (
    <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
            <span>TOTAL</span>
            <strong>R$ {total}</strong>
        </Total>
    </footer>
)