import Form from "@/components/Form";
import { useEffect, useState } from "react";
import storage from '@/storage';
import AdminSection from "@/components/Admin/AdminSection";
import LinkItem from '@/components/LinkItem';
import PreviewContext from "@/context/PreviewContext";

const selectOptions = [
    { label: "left" },
    { label: "center" },
    { label: "right"}
];

export default function UiForm() {
    // const [color, setColor] = useState(storage.getUiStyle('color'));
    // const [textAlign, setTextAlign] = useState(storage.getUiStyle('textAlign'));
    // const [fontSize, setFontSize] = useState(storage.getUiStyle('fontSize', 1));
    // const [borderRadius, setBorderRadius] = useState(storage.getUiStyle('borderRadius'));
    // const [borderWidth, setBorderWidth] = useState(storage.getUiStyle('borderWidth'));
    // const [borderColor, setBorderColor] = useState(storage.getUiStyle('borderColor'));
    // const [backgroundColor, setBackgroundColor] = useState(storage.getUiStyle('backgroundColor'));
    // const [logoImage, setLogoImage] = useState(storage.getItem('logo-img'));

    const [uiStyle, setUiStyle] = useState({
        color: storage.getUiStyle('color'),
        textAlign: storage.getUiStyle('textAlign'),
        fontSize: storage.getUiStyle('fontSize', 1),
        borderRadius: storage.getUiStyle('borderRadius'),
        borderWidth: storage.getUiStyle('borderWidth'),
        borderColor: storage.getUiStyle('borderColor'),
        backgroundColor: storage.getUiStyle('backgroundColor'),
        logoImage: storage.getItem('logo-img'),
    });

    const [uiStyleLive, setUiStyleLive] = useState(uiStyle);

    useEffect(() => {
        setUiStyleLive(uiStyle);
    }, [uiStyle]);
    
    const [hoverEnabled, setHoverEnabled] = useState(0);

    const [styleHover, setStyleHover] = useState(storage.getUiStyleHover());
    
    
    const handleSubmit = (event) => {
        event.preventDefault();

        storage.setItem('logo-img', logoImage);

        storage.setUiStyle(uiStyle);

        if(!hoverEnabled) {
            storage.setUiStyleHover({});
            return;    
        }

        storage.setUiStyleHover(styleHover);
    }

    const uploadHandler = (event) => {
        let fileReader = new FileReader;

        fileReader.onload = (file) => {
            setLogoImage(file.target.result);
        }

        fileReader.readAsDataURL(event.target.files[0]);
    }

    return (
        <PreviewContext contextData={uiStyleLive}>
            <div className="row">
                <LinkItem label="Botão de teste" />
            </div>
            <Form onSubmit={handleSubmit}>
                <AdminSection title="Redes sociais e Logo">
                    <div className="col">
                        <label className="form-label">Logo</label>
                        <input type="file" className="form-control form-control-color w-100" onChange={uploadHandler} />
                    </div>
                    <div>
                        <img src={uiStyle.logoImage} width="200px"/>
                    </div>
                </AdminSection>
                <AdminSection title="Texto e cor de fundo">
                    <div className="col">
                        <label className="form-label">Cor</label>
                        <input type="color" className="form-control form-control-color w-100"
                            value={uiStyle.color}
                            onChange={event => setUiStyle({...uiStyle, color: event.target.value})} />
                    </div>
                    <div className="col">
                        <label className="form-label">Cor de fundo</label>
                        <input type="color" className="form-control form-control-color w-100"
                            value={uiStyle.backgroundColor}
                            onChange={event => setUiStyle({...uiStyle, backgroundColor: event.target.value})} />
                    </div>
                    <div className="col">
                        <label className="form-label">Posicionamento</label>
                        <select className="form-control" value={uiStyle.textAlign} 
                        onChange={event => setUiStyle({...uiStyle, textAlign: event.target.value})}>
                            { selectOptions.map(item => (
                                <option key={item.label}>
                                    {item.label}
                                </option>
                            )) }
                        </select>
                    </div>
                    <div className="col">
                        <label className="form-label">Tamanho ({uiStyle.fontSize}px)</label>
                        <input type="range" min="1" max="52" step="1" className="form-range"
                            value={uiStyle.fontSize}
                            onChange={event => setUiStyle({...uiStyle, fontSize: event.target.value})} />
                    </div>
                </AdminSection>
            
                <hr />
                <h4 className="mt-4">Bordas</h4>
                <div className="row">
                    <div className="col">
                        <label className="form-label">Cor</label>
                        <input type="color" className="form-control form-control-color w-100"
                            value={uiStyle.borderColor}
                            onChange={event => setUiStyle({...uiStyle, borderColor: event.target.value})} />
                    </div>
                    <div className="col">
                        <label className="form-label">Largura ({uiStyle.borderWidth}px)</label>
                        <input type="range" min="0" max="10" step="1" className="form-range"
                            value={uiStyle.borderWidth} 
                            onChange={event => setUiStyle({...uiStyle, borderWidth: event.target.value})} />
                    </div>
                    <div className="col">
                        <label className="form-label">Radius ({uiStyle.borderRadius}px)</label>
                        <input type="range" min="0" max="100" step="1" className="form-range" 
                            value={uiStyle.borderRadius} 
                            onChange={event => setUiStyle({...uiStyle, borderRadius: event.target.value})} />
                    </div>
                </div>

                <AdminSection title="Hover" lastSection>
                    <div className="col">
                        <label className="form-label">Status</label>
                        <select name="" id="" className="form-control" value={hoverEnabled} onChange={event => setHoverEnabled(Number(event.target.value))}>
                            <option value="0">Desabilitado</option>
                            <option value="1">Habilitado</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="form-label">Cor do Texto</label>
                        <input type="color" className="form-control form-control-color w-100"
                            disabled={Boolean(!hoverEnabled)}
                            value={styleHover.color ?? ''}
                            onChange={event => setStyleHover({...styleHover, color: event.target.value})} />
                    </div>
                    <div className="col">
                        <label className="form-label">Cor da borda</label>
                        <input type="color" className="form-control form-control-color w-100"
                            disabled={Boolean(!hoverEnabled)}
                            value={styleHover.borderColor ?? ''}
                            onChange={event => setStyleHover({...styleHover, borderColor: event.target.value})} />
                    </div>
                    <div className="col">
                        <label className="form-label">Cor de fundo</label>
                        <input type="color" className="form-control form-control-color w-100"
                            disabled={Boolean(!hoverEnabled)}
                            value={styleHover.backgroundColor ?? ''}
                            onChange={event => setStyleHover({...styleHover, backgroundColor: event.target.value})} />
                    </div>
                </AdminSection>    
            
                <div>
                    <button className="btn btn-dark w-100 mt-3">Salvar</button>
                </div>
            </Form>
        </PreviewContext>
    );
}