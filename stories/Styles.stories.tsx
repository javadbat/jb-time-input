import type React from 'react';
import { JBTimeInput } from 'jb-time-input/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import '../../../docs/styles/ant-design.css';
import '../../../docs/styles/aurora.css';
import '../../../docs/styles/bootstrap.css';
import '../../../docs/styles/candy.css';
import '../../../docs/styles/carbon.css';
import '../../../docs/styles/cupertino.css';
import '../../../docs/styles/fluent.css';
import '../../../docs/styles/forest.css';
import '../../../docs/styles/material.css';
import '../../../docs/styles/porcelain.css';
import '../../../docs/styles/sunset.css';
import '../../../docs/styles/terminal.css';
import '../../jb-input/stories/styles/style-ant-design.css';
import '../../jb-input/stories/styles/style-aurora.css';
import '../../jb-input/stories/styles/style-bootstrap.css';
import '../../jb-input/stories/styles/style-candy.css';
import '../../jb-input/stories/styles/style-carbon.css';
import '../../jb-input/stories/styles/style-cupertino.css';
import '../../jb-input/stories/styles/style-fluent.css';
import '../../jb-input/stories/styles/style-forest.css';
import '../../jb-input/stories/styles/style-material.css';
import '../../jb-input/stories/styles/style-porcelain.css';
import '../../jb-input/stories/styles/style-sunset.css';
import '../../jb-input/stories/styles/style-terminal.css';
import '../../jb-time-picker/stories/styles/style-ant-design.css';
import '../../jb-time-picker/stories/styles/style-aurora.css';
import '../../jb-time-picker/stories/styles/style-bootstrap.css';
import '../../jb-time-picker/stories/styles/style-candy.css';
import '../../jb-time-picker/stories/styles/style-carbon.css';
import '../../jb-time-picker/stories/styles/style-cupertino.css';
import '../../jb-time-picker/stories/styles/style-fluent.css';
import '../../jb-time-picker/stories/styles/style-forest.css';
import '../../jb-time-picker/stories/styles/style-material.css';
import '../../jb-time-picker/stories/styles/style-porcelain.css';
import '../../jb-time-picker/stories/styles/style-sunset.css';
import '../../jb-time-picker/stories/styles/style-terminal.css';
import './styles/style-ant-design.css';
import './styles/style-aurora.css';
import './styles/style-bootstrap.css';
import './styles/style-candy.css';
import './styles/style-carbon.css';
import './styles/style-cupertino.css';
import './styles/style-fluent.css';
import './styles/style-forest.css';
import './styles/style-material.css';
import './styles/style-porcelain.css';
import './styles/style-sunset.css';
import './styles/style-terminal.css';

const meta = {
  title: "Components/form elements/Inputs/JBTimeInput/Style",
  component: JBTimeInput,
} satisfies Meta<typeof JBTimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const styleSamples = [
  { name: "Carbon", themeClassName: "carbon-style" },
  { name: "Aurora", themeClassName: "aurora-style" },
  { name: "Forest", themeClassName: "forest-style" },
  { name: "Sunset", themeClassName: "sunset-style" },
  { name: "Porcelain", themeClassName: "porcelain-style" },
  { name: "Candy", themeClassName: "candy-style" },
  { name: "Terminal", themeClassName: "terminal-style" },
  { name: "Material", themeClassName: "material-style" },
  { name: "Fluent", themeClassName: "fluent-style" },
  { name: "Bootstrap", themeClassName: "bootstrap-style" },
  { name: "Cupertino", themeClassName: "cupertino-style" },
  { name: "Ant Design", themeClassName: "ant-design-style" },
];

type TimeInputStyleSampleProps = {
  className: string;
};

function StyledTimeInput({
  className,
  ...props
}: TimeInputStyleSampleProps & React.ComponentProps<typeof JBTimeInput>) {
  return <JBTimeInput className={className} {...props} />;
}

function OpenTimePickerInput({ className }: TimeInputStyleSampleProps) {
  return (
    <JBTimeInput
      className={className}
      label="Open picker"
      value="09:24:36"
      message="Picker uses the same theme"
    />
  );
}

function TimeInputStyleSample(props: TimeInputStyleSampleProps) {
  return (
    <div style={{ display: "grid", gap: "0.75rem", minWidth: 0, maxWidth: "100%", width: "100%" }}>
      <StyledTimeInput {...props} label="Meeting time" placeholder="HH:mm:ss" message="Pick a delivery window" />
      <StyledTimeInput {...props} label="Selected time" value="13:45:20" />
      <StyledTimeInput {...props} label="Validation error" error="Time is outside working hours" />
      <StyledTimeInput {...props} label="Without seconds" value="09:24" secondEnabled={false} />
      <OpenTimePickerInput {...props} />
    </div>
  );
}

export const Gallery: Story = {
  name: "Gallery",
  render: () => (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(21rem, 1fr))",
      gap: "1.25rem",
      alignItems: "start",
      width: "min(100%, 82rem)",
    }}>
      {styleSamples.map((sample) => (
        <section
          key={sample.themeClassName}
          style={{
            display: "grid",
            gap: "0.75rem",
            minWidth: 0,
            padding: "1rem",
            background: "var(--jb-surface, #ffffff)",
            border: "1px solid var(--jb-border-color, #e5e7eb)",
            borderRadius: "0.75rem",
            boxShadow: "0 0.75rem 1.75rem oklch(0% 0 0 / 0.08)",
          }}
          className={sample.themeClassName}
        >
          <div style={{
            width: "100%",
            color: "var(--jb-text-primary, #334155)",
            fontSize: "0.875rem",
            fontWeight: 700,
            lineHeight: 1.4,
            textAlign: "center",
          }}>
            {sample.name}
          </div>
          <TimeInputStyleSample
            className={sample.themeClassName}
          />
        </section>
      ))}
    </div>
  ),
};

export const Default: Story = { name: "Default", render: () => <TimeInputStyleSample className="" /> };
export const Carbon: Story = { name: "Carbon", render: () => <TimeInputStyleSample className="carbon-style" /> };
export const Aurora: Story = { name: "Aurora", render: () => <TimeInputStyleSample className="aurora-style" /> };
export const Forest: Story = { name: "Forest", render: () => <TimeInputStyleSample className="forest-style" /> };
export const Sunset: Story = { name: "Sunset", render: () => <TimeInputStyleSample className="sunset-style" /> };
export const Porcelain: Story = { name: "Porcelain", render: () => <TimeInputStyleSample className="porcelain-style" /> };
export const Candy: Story = { name: "Candy", render: () => <TimeInputStyleSample className="candy-style" /> };
export const Terminal: Story = { name: "Terminal", render: () => <TimeInputStyleSample className="terminal-style" /> };
export const Material: Story = { name: "Material", render: () => <TimeInputStyleSample className="material-style" /> };
export const Fluent: Story = { name: "Fluent", render: () => <TimeInputStyleSample className="fluent-style" /> };
export const Bootstrap: Story = { name: "Bootstrap", render: () => <TimeInputStyleSample className="bootstrap-style" /> };
export const Cupertino: Story = { name: "Cupertino", render: () => <TimeInputStyleSample className="cupertino-style" /> };
export const AntDesign: Story = { name: "Ant Design", render: () => <TimeInputStyleSample className="ant-design-style" /> };
